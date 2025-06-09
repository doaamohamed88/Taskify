import { useTranslation } from "react-i18next"
import styles from "./ProgressCard.module.css"
import "./ProgressRadial.css"

export default function ProgressCard({ score, title, colorScheme }) {

  const { t } = useTranslation()

  return (
    <div className={`${styles.progressCard} ${styles[colorScheme]}`}>
      <div className={`progress-radial progress-${score} ${colorScheme}`}>
        <div className="overlay">{score}%</div>
      </div>

      <div className={styles.progressCardTitle}><span></span>{t(`${title}`)}</div>
    </div>
  )
}
