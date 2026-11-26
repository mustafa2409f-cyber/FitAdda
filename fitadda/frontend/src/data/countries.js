// Country Registry: supported countries, flags, regions & localized greetings
const COUNTRIES_LIST = [
  {
    code: "PK",
    flag: "🇵🇰",
    name: { en: "Pakistan", ur: "پاکستان", roman: "Pakistan" },
    region: "South Asia",
    greetingSalutation: {
      en: "Assalam-o-alaikum!",
      ur: "السلام علیکم!",
      roman: "Assalam-o-alaikum!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Your health journey starts with one small step. No pressure here, just steady progress with a touch of desi warmth every single day.",
      ur: "فٹ اڈا میں خوش آمدید! صحت کا سفر ایک چھوٹے سے قدم سے شروع ہوتا ہے۔ یہاں دباؤ نہیں، بس ہر دن اپنے لیے ایک بہتر قدم اور دیسی اپنائیت ہے!",
      roman: "FitAdda mein khush aamdeed! Sehat ka safar ek chhote se qadam se shuru hota hai. Yahan pressure nahi, bas progress hai. Thori mehnat, thora desi maza aur har din apne liye ek behtar qadam!"
    }
  },
  {
    code: "IN",
    flag: "🇮🇳",
    name: { en: "India", ur: "بھارت", roman: "India" },
    region: "South Asia",
    greetingSalutation: {
      en: "Namaste!",
      ur: "نمستے!",
      roman: "Namaste!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Let us make your wellness journey joyful, flavorful, and full of positive energy!",
      ur: "فٹ اڈا میں خوش آمدید! آئیے آپ کے صحت کے سفر کو خوشگوار، توانا اور مزیدار بناتے ہیں!",
      roman: "FitAdda mein aapka swagat hai! Chaliye, sehat ke safar ko mazedaar aur energy se bharpoor banate hain!"
    }
  },
  {
    code: "AE",
    flag: "🇦🇪",
    name: { en: "United Arab Emirates", ur: "متحدہ عرب امارات", roman: "United Arab Emirates" },
    region: "Middle East",
    greetingSalutation: {
      en: "Marhaba!",
      ur: "مرحبا!",
      roman: "Marhaba!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Your journey towards a healthier and happier lifestyle starts right here.",
      ur: "فٹ اڈا میں خوش آمدید! ایک صحت مند اور خوشگوار طرزِ زندگی کی طرف آپ کا سفر یہیں سے شروع ہوتا ہے۔",
      roman: "FitAdda mein khush aamdeed! Ek sehatmand aur khushgawar lifestyle ki taraf aapka safar yahin se shuru hota hai."
    }
  },
  {
    code: "SA",
    flag: "🇸🇦",
    name: { en: "Saudi Arabia", ur: "سعودی عرب", roman: "Saudi Arabia" },
    region: "Middle East",
    greetingSalutation: {
      en: "As-salamu alaykum!",
      ur: "السلام علیکم!",
      roman: "As-salamu alaykum!"
    },
    welcomeBody: {
      en: "Ahlan wa sahlan to FitAdda! Build gentle daily habits, balanced meals, and joyful energy at your own pace.",
      ur: "فٹ اڈا میں اہلاً و سہلاً! اپنی رفتار سے صحت مند عادات، متوازن غذا اور خوشگوار توانائی پیدا کریں۔",
      roman: "Ahlan wa sahlan! FitAdda mein khush aamdeed—apni speed se achi aadaat aur healthy energy banayein."
    }
  },
  {
    code: "GB",
    flag: "🇬🇧",
    name: { en: "United Kingdom", ur: "برطانیہ", roman: "United Kingdom" },
    region: "Europe",
    greetingSalutation: {
      en: "Hello & cheerio!",
      ur: "ہیلو اور خوش آمدید!",
      roman: "Hello & welcome!"
    },
    welcomeBody: {
      en: "Lovely to have you at FitAdda! Rain or shine, we are here to cheer on every workout, sip of water, and home-cooked meal.",
      ur: "فٹ اڈا میں آپ کو دیکھ کر خوشی ہوئی! ہر موسم میں ہم آپ کی ہر ورزش اور صحت مند کھانے پر آپ کا حوصلہ بڑھائیں گے۔",
      roman: "FitAdda par aapko dekh kar bohot khushi hui! Har din thori si movement aur pyar bhari care ke saath aage barhein."
    }
  },
  {
    code: "US",
    flag: "🇺🇸",
    name: { en: "United States", ur: "امریکہ", roman: "United States" },
    region: "North America",
    greetingSalutation: {
      en: "Hey there!",
      ur: "ہیلو دوست!",
      roman: "Hey dost!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Ready to build real momentum without burnout? Let us take it one joyful day at a time.",
      ur: "فٹ اڈا میں خوش آمدید! بغیر تھکاوٹ کے مستقل مزاجی کے ساتھ آگے بڑھنے کے لیے تیار ہیں؟ آئیے ہر دن خوشی سے گزاریں۔",
      roman: "FitAdda mein welcome! Bina kisi pressure ke roz thora sa move karein aur apni sehat ko celebrate karein."
    }
  },
  {
    code: "CA",
    flag: "🇨🇦",
    name: { en: "Canada", ur: "کینیڈا", roman: "Canada" },
    region: "North America",
    greetingSalutation: {
      en: "Warm greetings!",
      ur: "پُرخلوص خوش آمدید!",
      roman: "Dil se welcome!"
    },
    welcomeBody: {
      en: "So glad you joined FitAdda! Cozy indoor sessions, wholesome nourishment, and kind daily habits await.",
      ur: "فٹ اڈا میں شامل ہونے کا شکریہ! پرسکون ورزشیں، متوازن غذا اور روزمرہ کی اچھی عادات آپ کی منتظر ہیں۔",
      roman: "FitAdda join karne ka shukriya! Cozy workouts aur balanced desi meals ke saath har din khush rahein."
    }
  },
  {
    code: "AU",
    flag: "🇦🇺",
    name: { en: "Australia", ur: "آسٹریلیا", roman: "Australia" },
    region: "Oceania",
    greetingSalutation: {
      en: "G'day mate!",
      ur: "خوش آمدید دوست!",
      roman: "G'day dost!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Fresh energy, sunny movement routines, and nourishing meals tailored just for you.",
      ur: "فٹ اڈا میں خوش آمدید! تازہ توانائی، خوشگوار ورزشیں اور آپ کے لیے موزوں متوازن کھانے یہاں موجود ہیں۔",
      roman: "FitAdda mein khush aamdeed! Fresh energy, active mornings aur mazedar sehatmand khane aapke intezar mein hain."
    }
  },
  {
    code: "TR",
    flag: "🇹🇷",
    name: { en: "Türkiye", ur: "ترکیہ", roman: "Turkiye" },
    region: "Europe & Asia",
    greetingSalutation: {
      en: "Merhaba!",
      ur: "مرحبا!",
      roman: "Merhaba!"
    },
    welcomeBody: {
      en: "Hos geldiniz to FitAdda! Let us bring warmth, balance, and cheerful movement into your daily routine.",
      ur: "فٹ اڈا میں خوش آمدید! آئیے اپنے روزمرہ معمولات میں توازن، حرارت اور خوشگوار حرکت شامل کریں۔",
      roman: "FitAdda mein khush aamdeed! Apne rozana ke routine mein pyaar, balance aur khushi bhari movement shamil karein."
    }
  },
  {
    code: "MY",
    flag: "🇲🇾",
    name: { en: "Malaysia", ur: "ملائیشیا", roman: "Malaysia" },
    region: "Southeast Asia",
    greetingSalutation: {
      en: "Selamat datang!",
      ur: "خوش آمدید!",
      roman: "Selamat datang!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Enjoy upbeat routines, vibrant nourishment, and supportive milestones every step of the way.",
      ur: "فٹ اڈا میں خوش آمدید! ہر قدم پر پرجوش ورزشوں، صحت بخش غذا اور حوصلہ افزا کامیابیوں سے لطف اٹھائیں۔",
      roman: "FitAdda mein khush aamdeed! Har qadam par behtar energy, tasty meals aur chhoti chhoti jeet enjoy karein."
    }
  },
  {
    code: "ID",
    flag: "🇮🇩",
    name: { en: "Indonesia", ur: "انڈونیشیا", roman: "Indonesia" },
    region: "Southeast Asia",
    greetingSalutation: {
      en: "Halo & selamat datang!",
      ur: "ہیلو اور خوش آمدید!",
      roman: "Halo & khush aamdeed!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Move happily, stay hydrated, and celebrate every positive habit you nurture.",
      ur: "فٹ اڈا میں خوش آمدید! خوشی سے حرکت کریں، پانی پیتے رہیں اور ہر اچھی عادت کا جشن منائیں۔",
      roman: "FitAdda mein welcome! Khushi se move karein, paani piyen aur har achi aadat ko celebrate karein."
    }
  },
  {
    code: "BD",
    flag: "🇧🇩",
    name: { en: "Bangladesh", ur: "بنگلہ دیش", roman: "Bangladesh" },
    region: "South Asia",
    greetingSalutation: {
      en: "Assalamu Alaikum!",
      ur: "السلام علیکم!",
      roman: "Assalamu Alaikum!"
    },
    welcomeBody: {
      en: "Shagotom to FitAdda! Simple, joyful workouts and homely balanced nutrition designed around your everyday life.",
      ur: "فٹ اڈا میں خوش آمدید! آپ کی روزمرہ زندگی کے مطابق سادہ ورزشیں اور گھر جیسی متوازن غذا۔",
      roman: "FitAdda mein khush aamdeed! Aapke rozana ke hisaab se aasan workouts aur ghar jaisa sehatmand khana."
    }
  },
  {
    code: "QA",
    flag: "🇶🇦",
    name: { en: "Qatar", ur: "قطر", roman: "Qatar" },
    region: "Middle East",
    greetingSalutation: {
      en: "Marhaba!",
      ur: "مرحبا!",
      roman: "Marhaba!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Steady wellness, hydration reminders, and friendly encouragement await you.",
      ur: "فٹ اڈا میں خوش آمدید! مستقل تندرستی، پانی پینے کی یاددہانی اور دوستانہ حوصلہ افزائی آپ کی منتظر ہے۔",
      roman: "FitAdda mein khush aamdeed! Sehatmand routine, paani ki yaad-dihani aur dostana hosla afzai aapke liye tayyar hai."
    }
  },
  {
    code: "KW",
    flag: "🇰🇼",
    name: { en: "Kuwait", ur: "کویت", roman: "Kuwait" },
    region: "Middle East",
    greetingSalutation: {
      en: "Hala & welcome!",
      ur: "ہلا اور خوش آمدید!",
      roman: "Hala & khush aamdeed!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Let us turn gentle daily movement into your favorite part of the day.",
      ur: "فٹ اڈا میں خوش آمدید! آئیے روزمرہ کی ہلکی پھلکی ورزش کو آپ کے دن کا پسندیدہ حصہ بنائیں۔",
      roman: "FitAdda mein welcome! Aayein roz ki halki phulki movement ko apne din ka sab se pyara hissa banayein."
    }
  },
  {
    code: "OM",
    flag: "🇴🇲",
    name: { en: "Oman", ur: "عمان", roman: "Oman" },
    region: "Middle East",
    greetingSalutation: {
      en: "Ahlan!",
      ur: "اہلاً!",
      roman: "Ahlan!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Calm strength, mindful hydration, and joyful consistency start today.",
      ur: "فٹ اڈا میں خوش آمدید! پُرسکون طاقت، متوازن پانی اور خوشگوار تسلسل آج سے شروع ہوتا ہے۔",
      roman: "FitAdda mein khush aamdeed! Sukoon bhari taqat aur sehatmand aadaat aaj se shuru hoti hain."
    }
  },
  {
    code: "BH",
    flag: "🇧🇭",
    name: { en: "Bahrain", ur: "بحرین", roman: "Bahrain" },
    region: "Middle East",
    greetingSalutation: {
      en: "Marhaba!",
      ur: "مرحبا!",
      roman: "Marhaba!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Every stretch, walk, and wholesome meal brings you closer to feeling amazing.",
      ur: "فٹ اڈا میں خوش آمدید! ہر اسٹریچ، چہل قدمی اور صحت بخش کھانا آپ کو تروتازہ محسوس کرواتا ہے۔",
      roman: "FitAdda mein khush aamdeed! Har walk, stretch aur sehatmand meal aapko aur behtar mehsoos karwata hai."
    }
  },
  {
    code: "EG",
    flag: "🇪🇬",
    name: { en: "Egypt", ur: "مصر", roman: "Egypt" },
    region: "Africa & Middle East",
    greetingSalutation: {
      en: "Ahlan wa sahlan!",
      ur: "اہلاً و سہلاً!",
      roman: "Ahlan wa sahlan!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Vibrant energy, gentle goals, and uplifting wellness built around you.",
      ur: "فٹ اڈا میں خوش آمدید! پُرجوش توانائی، آسان اہداف اور آپ کے مزاج کے مطابق تندرستی۔",
      roman: "FitAdda mein khush aamdeed! Khushgawar energy aur aasan goals jo aapke hisaab se set hain."
    }
  },
  {
    code: "JP",
    flag: "🇯🇵",
    name: { en: "Japan", ur: "جاپان", roman: "Japan" },
    region: "East Asia",
    greetingSalutation: {
      en: "Konnichiwa!",
      ur: "کونچیوا!",
      roman: "Konnichiwa!"
    },
    welcomeBody: {
      en: "Yokoso to FitAdda! Embrace kaizen—small, mindful daily improvements that bring lasting joy.",
      ur: "فٹ اڈا میں خوش آمدید! روزانہ کی چھوٹی اور پائیدار بہتری کو اپنائیں جو دیرپا خوشی دیتی ہے۔",
      roman: "FitAdda mein khush aamdeed! Rozana thori si behtari apnayein jo hamesha khushi aur sehat laati hai."
    }
  },
  {
    code: "KR",
    flag: "🇰🇷",
    name: { en: "South Korea", ur: "جنوبی کوریا", roman: "South Korea" },
    region: "East Asia",
    greetingSalutation: {
      en: "Annyeonghaseyo!",
      ur: "آنیونگ ہاسیو!",
      roman: "Annyeonghaseyo!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Cheerful workouts, balanced bowls, and steady positive vibes await.",
      ur: "فٹ اڈا میں خوش آمدید! خوشگوار ورزشیں، متوازن کھانے اور مثبت توانائی آپ کی منتظر ہے۔",
      roman: "FitAdda mein welcome! Mazedaar workouts aur balanced nutrition ke saath apna safar shuru karein."
    }
  },
  {
    code: "CN",
    flag: "🇨🇳",
    name: { en: "China", ur: "چین", roman: "China" },
    region: "East Asia",
    greetingSalutation: {
      en: "Ni hao!",
      ur: "نی ہاؤ!",
      roman: "Ni hao!"
    },
    welcomeBody: {
      en: "Huanying to FitAdda! Harmony of movement, hydration, and nourishing food every day.",
      ur: "فٹ اڈا میں خوش آمدید! ہر روز حرکت، پانی اور غذائیت بخش کھانوں کا خوبصورت توازن۔",
      roman: "FitAdda mein khush aamdeed! Rozana movement, paani aur sehatmand khanon ka behtareen balance."
    }
  },
  {
    code: "DE",
    flag: "🇩🇪",
    name: { en: "Germany", ur: "جرمنی", roman: "Germany" },
    region: "Europe",
    greetingSalutation: {
      en: "Hallo & willkommen!",
      ur: "ہیلو اور خوش آمدید!",
      roman: "Hallo & welcome!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Thoughtful routines, clear daily goals, and refreshing balance.",
      ur: "فٹ اڈا میں خوش آمدید! منظم ورزشیں، واضح روزانہ اہداف اور تروتازہ توازن۔",
      roman: "FitAdda mein khush aamdeed! Saaf suthre daily goals aur fresh balance ke saath aage barhein."
    }
  },
  {
    code: "FR",
    flag: "🇫🇷",
    name: { en: "France", ur: "فرانس", roman: "France" },
    region: "Europe",
    greetingSalutation: {
      en: "Bonjour!",
      ur: "بونجور!",
      roman: "Bonjour!"
    },
    welcomeBody: {
      en: "Bienvenue to FitAdda! Enjoy movement with grace, good food without guilt, and everyday joy.",
      ur: "فٹ اڈا میں خوش آمدید! لطف اندوزی کے ساتھ حرکت کریں اور بغیر کسی پشیمانی کے اچھا کھانا کھائیں۔",
      roman: "FitAdda mein khush aamdeed! Khushi ke saath move karein aur bina tension ke acha khana enjoy karein."
    }
  },
  {
    code: "ES",
    flag: "🇪🇸",
    name: { en: "Spain", ur: "سپین", roman: "Spain" },
    region: "Europe",
    greetingSalutation: {
      en: "Hola amigo!",
      ur: "اولا دوست!",
      roman: "Hola dost!"
    },
    welcomeBody: {
      en: "Bienvenido to FitAdda! Sunny motivation, upbeat sessions, and delicious healthy meals.",
      ur: "فٹ اڈا میں خوش آمدید! روشن حوصلہ افزائی، پرجوش سیشنز اور لذیذ صحت بخش کھانے۔",
      roman: "FitAdda mein khush aamdeed! Purjosh motivation, aasan sessions aur lazeez sehatmand khane."
    }
  },
  {
    code: "IT",
    flag: "🇮🇹",
    name: { en: "Italy", ur: "اٹلی", roman: "Italy" },
    region: "Europe",
    greetingSalutation: {
      en: "Ciao!",
      ur: "چاؤ!",
      roman: "Ciao!"
    },
    welcomeBody: {
      en: "Benvenuto to FitAdda! Celebrate wholesome ingredients, lively movement, and feeling wonderful.",
      ur: "فٹ اڈا میں خوش آمدید! صحت بخش اجزاء، جاندار حرکت اور خوشگوار احساس کا جشن منائیں۔",
      roman: "FitAdda mein khush aamdeed! Taaza khana, khushgawar movement aur behtar sehat ka jashn manayein."
    }
  },
  {
    code: "BR",
    flag: "🇧🇷",
    name: { en: "Brazil", ur: "برازیل", roman: "Brazil" },
    region: "South America",
    greetingSalutation: {
      en: "Olá!",
      ur: "اولا!",
      roman: "Olá!"
    },
    welcomeBody: {
      en: "Bem-vindo to FitAdda! Bring cheerful rhythm, warmth, and active energy to every single day.",
      ur: "فٹ اڈا میں خوش آمدید! ہر دن میں خوشگوار ردھم، گرمجوشی اور فعال توانائی لے کر آئیں۔",
      roman: "FitAdda mein khush aamdeed! Har din mein khushi, rhythm aur active energy shamil karein."
    }
  },
  {
    code: "NG",
    flag: "🇳🇬",
    name: { en: "Nigeria", ur: "نائیجیریا", roman: "Nigeria" },
    region: "Africa",
    greetingSalutation: {
      en: "Sannu & welcome!",
      ur: "خوش آمدید دوست!",
      roman: "Sannu & welcome!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Strong energy, joyful consistency, and nourishing meals tailored for your day.",
      ur: "فٹ اڈا میں خوش آمدید! بھرپور توانائی، خوشگوار تسلسل اور آپ کے دن کے مطابق غذائیت بخش کھانے۔",
      roman: "FitAdda mein khush aamdeed! Bharpoor energy, khushgawar consistency aur mazedar meals aapke liye."
    }
  },
  {
    code: "KE",
    flag: "🇰🇪",
    name: { en: "Kenya", ur: "کینیا", roman: "Kenya" },
    region: "Africa",
    greetingSalutation: {
      en: "Jambo!",
      ur: "جامبو!",
      roman: "Jambo!"
    },
    welcomeBody: {
      en: "Karibu to FitAdda! Move with stride, hydrate happily, and enjoy every milestone along the way.",
      ur: "فٹ اڈا میں خوش آمدید! پُراعتماد قدم بڑھائیں، پانی پیتے رہیں اور ہر سنگِ میل سے لطف اندوز ہوں۔",
      roman: "FitAdda mein khush aamdeed! Khushi se qadam barhayein, paani piyen aur har kamyabi enjoy karein."
    }
  },
  {
    code: "SG",
    flag: "🇸🇬",
    name: { en: "Singapore", ur: "سنگاپور", roman: "Singapore" },
    region: "Southeast Asia",
    greetingSalutation: {
      en: "Hello & welcome!",
      ur: "ہیلو اور خوش آمدید!",
      roman: "Hello & welcome!"
    },
    welcomeBody: {
      en: "Welcome to FitAdda! Smart daily movement, balanced flavors, and refreshing wellness in one cozy spot.",
      ur: "فٹ اڈا میں خوش آمدید! روزانہ کی ذہین حرکت، متوازن ذائقے اور تروتازہ تندرستی ایک ہی جگہ۔",
      roman: "FitAdda mein khush aamdeed! Smart daily workouts, balanced zaiqe aur fresh sehat ek hi jagah."
    }
  }
];
const FALLBACK_GREETING = {
  salutation: {
    en: "Hello, friend!",
    ur: "خوش آمدید دوست!",
    roman: "Khush aamdeed, dost!"
  },
  body: {
    en: "Welcome to FitAdda! Your journey towards joyful health, gentle strength, and happy habits starts right here.",
    ur: "فٹ اڈا میں خوش آمدید! خوشگوار صحت، مضبوطی اور اچھی عادات کا سفر یہیں سے شروع ہوتا ہے۔",
    roman: "FitAdda mein khush aamdeed! Khushi, sehat aur achi aadaat ka safar yahin se shuru hota hai."
  }
};
function getCountryByCode(code) {
  return COUNTRIES_LIST.find((c) => c.code === code);
}
function getCulturalGreeting(countryCode, language) {
  const country = getCountryByCode(countryCode);
  if (!country) {
    return {
      salutation: FALLBACK_GREETING.salutation[language],
      body: FALLBACK_GREETING.body[language],
      countryFlag: "🌍",
      countryName: "Global"
    };
  }
  return {
    salutation: country.greetingSalutation[language] || FALLBACK_GREETING.salutation[language],
    body: country.welcomeBody[language] || FALLBACK_GREETING.body[language],
    countryFlag: country.flag,
    countryName: country.name[language]
  };
}
export {
  COUNTRIES_LIST,
  FALLBACK_GREETING,
  getCountryByCode,
  getCulturalGreeting
};
