import { useState, useEffect } from "react";
import classes from "./Header.module.css";
import i18n from "../../i18n";
import * as FaIcons from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { useTheme } from "../../context/ThemeContext";
function Header() {
const [currentLang, setCurrentLang] = useState(i18n.language);
const { toggleTheme } = useTheme();

  const handleLanguageChange = (lang) => {
    i18n
      .changeLanguage(lang)
      .then(() => setCurrentLang(lang))
      .catch((err) => console.error("Error changing language:", err));
  };

  useEffect(() => {
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  }, [currentLang]);

  return (
    <div className={classes.header}>
      <Link to='/'>
        <p className={classes.logo}>Taskify</p>
      </Link>
      <div>
        <button
          onClick={() => handleLanguageChange(currentLang === "ar" ? "en" : "ar")}
        >
          {currentLang === "ar" ? "en" : "ar"}
        </button>
        <button onClick={toggleTheme}>
          <FaIcons.FaLightbulb />
        </button>
      </div>
    </div>
  );
}

export default Header;
