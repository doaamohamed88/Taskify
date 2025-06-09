import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FaUser } from "react-icons/fa6"
import { Link } from "react-router-dom"
import classes from "./MobileMenu.module.css"
import { useEffect } from "react"

export default function MobileMenu({
  toggleTheme,
  setThemeIcon,
  currentLang,
  handleLanguageChange,
  themeIcon,
  toggleMobileMenu,
  setToggleMobileMenu,
}) {
  useEffect(() => {
    const buttonClickEvent = document.addEventListener("click", (e) => {
      if (e.target.matches("button") || e.target.matches("p")) {
        setToggleMobileMenu(false)
      }

      return () => {
        document.removeEventListener("click", buttonClickEvent)
      }
    })
  }, [])

  return (
    <div className={`${classes.mobileMenu} ${toggleMobileMenu ? classes.showMenu : ""}`}>
      <Link to="/">
        <p className={classes.logo}>Home</p>
      </Link>

      <div>
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
          className={classes.lang}
          onClick={() => handleLanguageChange(currentLang === "ar" ? "en" : "ar")}
        >
          {currentLang === "ar" ? "en" : "ar"}
        </button>
        <button className={classes.signOut}>
          <FaUser />
          Sign Out
        </button>
      </div>
    </div>
  )
}
