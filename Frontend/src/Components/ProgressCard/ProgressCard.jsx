import st from "./ProgressCard.module.css"
import "./ProgressRadial.css"

export default function ProgressCard({ score, title, colorScheme }) {
  return (
    <div className={`${st.progressCard} ${st[colorScheme]}`}>
      <div className={`progress-radial progress-${score} ${colorScheme}`}>
        <div className="overlay">{score}%</div>
      </div>

      <div className={st.progressCardTitle}><span></span>{title}</div>
    </div>
  )
}
