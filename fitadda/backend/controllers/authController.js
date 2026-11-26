const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const { generateToken } = require("../utils/tokenHelper");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: "Google credential missing" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-10) + "Aa1!";
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);
      const baseUsername = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "");

      user = await User.create({
        username: `${baseUsername}_${Math.floor(100 + Math.random() * 900)}`,
        name: name || baseUsername,
        email,
        password: hashedPassword,
        avatarUrl: picture || ""
      });
    } else if (!user.avatarUrl && picture) {
      user.avatarUrl = picture;
      await user.save();
    }

    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      token: generateToken(user._id),
      user: userObj
    });
  } catch (error) {
    res.status(401).json({ message: "Google authentication failed: " + error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, name, email, password, avatarUrl, gender, goal, activityLevel, countryCode, language } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const finalUsername = username || `${email.split("@")[0]}_${Math.floor(100 + Math.random() * 900)}`;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username: finalUsername,
      name,
      email,
      password: hashedPassword,
      avatarUrl: avatarUrl || "",
      gender,
      goal,
      activityLevel,
      countryCode,
      language
    });

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const userObj = user.toObject();
      delete userObj.password;
      return res.json({
        token: generateToken(user._id),
        user: userObj
      });
    }
    res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  res.json(req.user);
};

const updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.user._id, req.body, { new: true }).select("-password");
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = code;
    await user.save();

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.resend.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: `"FitAdda Security" <${process.env.SENDER_EMAIL || "onboarding@resend.dev"}>`,
        to: email,
        subject: "Your FitAdda Password Reset Code",
        html: `
          <div style="font-family:sans-serif;padding:24px;border:1px solid #EAE3F8;border-radius:16px;max-width:480px;">
            <h2 style="color:#7C3AED;margin-top:0;">FitAdda Password Reset</h2>
            <p>Assalam-o-Alaikum <b>${user.name}</b>,</p>
            <p>Use this 6-digit verification code to reset your password:</p>
            <div style="background:#F5F1FE;padding:14px;border-radius:12px;text-align:center;margin:16px 0;">
              <span style="font-size:28px;font-weight:bold;letter-spacing:6px;color:#0D9488;">${code}</span>
            </div>
            <p style="font-size:12px;color:#6E6586;">If you did not request this, please ignore this email.</p>
          </div>
        `
      });

      return res.json({ message: "Verification code sent to your email inbox!" });
    }

    res.json({ message: `Verification code generated: ${code}`, resetCode: code });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ message: "Failed to send email: " + error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (!user || user.resetCode !== code) {
      return res.status(400).json({ message: "Invalid verification code or email" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetCode = "";
    await user.save();

    res.json({ message: "Password reset successful! You can now login." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: "Account deleted permanently" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  googleAuth,
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  deleteAccount
};