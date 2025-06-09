import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FaUser } from "react-icons/fa6"
import { Link } from "react-router-dom"
import classes from "./MobileMenu.module.css"
import { logout } from "../../services/userService"

export default function MobileMenu({
  toggleTheme,
  setThemeIcon,
  currentLang,
  handleLanguageChange,
  themeIcon,
  toggleMobileMenu,
  setToggleMobileMenu,
}) {
  return (
    <div className={`${classes.mobileMenu} ${toggleMobileMenu ? classes.showMenu : ""}`}>
      <Link to="/" onClick={() => setToggleMobileMenu(false)}>
        <p className={classes.logo}>Home</p>
      </Link>

      <div>
        <button
          onClick={() => {
            toggleTheme()
            setThemeIcon(themeIcon === "light" ? "dark" : "light")
            setToggleMobileMenu(false)
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
          onClick={() => {
            handleLanguageChange(currentLang === "ar" ? "en" : "ar")
            setToggleMobileMenu(false)
          }}
        >
          {currentLang === "ar" ? "en" : "ar"}
        </button>
        <button
          className={classes.signOut}
          onClick={() => {
            setToggleMobileMenu(false)
            logout()
          }}
        >
          <FaUser />
          Sign Out
        </button>
      </div>
    </div>
  )
}
