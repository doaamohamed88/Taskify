import { useState, useEffect } from "react"
import styles from "./Header.module.css"
import i18n from "../../i18n"
import * as FaIcons from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import MobileMenu from "../MobileMenu/MobileMenu"
import { logout } from "../../services/userService"
import { useTranslation } from "react-i18next"

function Header() {
  const [currentLang, setCurrentLang] = useState(i18n.language)
  const [themeIcon, setThemeIcon] = useState("light")
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { toggleTheme } = useTheme()
  const { t } = useTranslation()

  const handleLanguageChange = (lang) => {
    i18n
      .changeLanguage(lang)
      .then(() => setCurrentLang(lang))
      .catch((err) => console.error("Error changing language:", err))
  }

  useEffect(() => {
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr"
  }, [currentLang])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.links}>
          <Link to="/">
            <p className={styles.logo}>Taskify</p>
          </Link>
          <Link to="/createdboardsPage">
            <p className={styles.header_link}>{t("Created Boards")}</p>
          </Link>
          <Link to="/involvedboardsPage">
            <p className={styles.header_link}>{t("Involved Boards")}</p>
          </Link>
        </div>

        <div className={styles.buttons}>
          <button
            onClick={() => {
              toggleTheme()
              setThemeIcon(themeIcon === "light" ? "dark" : "light")
            }}
          >
            {themeIcon === "light" ? (
              <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
            )}
          </button>
          <button
            className={styles.lang}
            onClick={() => handleLanguageChange(currentLang === "ar" ? "en" : "ar")}
          >
            {currentLang === "ar" ? "en" : "ar"}
          </button>
          <button className={styles.signOut} onClick={logout}>
            <FaIcons.FaUser />
            {t('Sign Out')}
          </button>
        </div>
      </div>

      <FontAwesomeIcon
        icon={faBars}
        className={`${styles.bars} ${toggleMobileMenu ? styles.rotateIcon : ""}`}
        onClick={() => setToggleMobileMenu(!toggleMobileMenu)}
      ></FontAwesomeIcon>
      {console.log(toggleMobileMenu)}

      <MobileMenu
        toggleTheme={toggleTheme}
        setThemeIcon={setThemeIcon}
        handleLanguageChange={handleLanguageChange}
        themeIcon={themeIcon}
        currentLang={currentLang}
        toggleMobileMenu={toggleMobileMenu}
        setToggleMobileMenu={setToggleMobileMenu}
      ></MobileMenu>
    </>
  )
}

export default Header
