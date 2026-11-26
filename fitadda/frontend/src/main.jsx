// Entry point: mounts the React FitAdda app into #root
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
createRoot(document.getElementById("root")).render(<App />);
