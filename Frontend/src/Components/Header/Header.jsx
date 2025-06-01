import React, { useState, useEffect } from "react";
import classes from "./Header.module.css";
import i18n from "../../i18n";
import * as FaIcons from "react-icons/fa6";
function Header() {
  const [currentLang, setCurrentLang] = useState(i18n.language);

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
      <p className={classes.logo}>Taskify</p>
      <div>
        <button
          onClick={() => handleLanguageChange(currentLang === "ar" ? "en" : "ar")}
        >
          {currentLang === "ar" ? "en" : "ar"}
        </button>
        <button>
          <FaIcons.FaLightbulb />
        </button>
      </div>
    </div>
  );
}

export default Header;
