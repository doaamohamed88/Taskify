import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ProgressCard from "../../Components/ProgressCard/ProgressCard"
import TeamMember from "../../Components/teamMemberCard/TeamMember"
import st from "./AdminDashboard.module.css"
import { useTranslation } from "react-i18next"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import Modal from "../../Components/Modal/Modal"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedBoard } from "../../store/selectedBoard"
import { getBoardById } from "../../services/boardService"
import { getUserByEmail } from "../../services/userService"
import { set } from "react-hook-form"

export default function AdminDashboard() {
  const modalRef = useRef()
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const userBoardId = useSelector((state) => state.user.boards[1].id)
  const boardData = useSelector((state) => state.selectedBoard)
  const adminInfo = useSelector((state) => state.user)

  const [totalTasks, setTotalTasks] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)
  const [inProgressTasks, setInProgressTasks] = useState(0)
  const [notStartedTasks, setNotStartedTasks] = useState(0)
  const [memberInfo, setMemberInfo] = useState([])

  useEffect(() => {
    const fetchBoard = async () => {
      let board = null
      if (userBoardId) {
        try {
          board = await getBoardById(userBoardId)
          dispatch(setSelectedBoard(board))
        } catch (error) {
          console.error("Error fetching board:", error)
        }
      }
    }
    fetchBoard()
  }, [userBoardId])

  useEffect(() => {
    if (boardData) {
      calculateProgress()
      setMemberInfo([])
      getMemberInfo()
    }
  }, [boardData])

  function calculateProgress() {
    setTotalTasks(boardData.tasks.length)
    setCompletedTasks(
      boardData.tasks.length > 0 &&
        Math.round(
          (boardData.tasks.filter((task) => task.status === "done").length /
            boardData.tasks.length) *
            100
        )
    )
    setInProgressTasks(
      boardData.tasks.length > 0 &&
        Math.round(
          (boardData.tasks.filter((task) => task.status === "in-progress").length /
            boardData.tasks.length) *
            100
        )
    )
    setNotStartedTasks(
      boardData.tasks.length > 0 &&
        Math.round(
          (boardData.tasks.filter((task) => task.status === "todo").length /
            boardData.tasks.length) *
            100
        )
    )
  }

  function getMemberInfo() {
    boardData.members.forEach((memb) => {
      if (memb.email === adminInfo.email) return
      getUserByEmail(memb.email).then((res) => {
        setMemberInfo((arr) => {
          if (arr.some((member) => member.email === res.email)) return arr
          return [...arr, { name: res.name, email: res.email }]
        })
      })
    })
  }

  return (
    <>
      <div className={st.grid}>
        <h1>
          {t("Welcome back, ")}
          {adminInfo.name} 👋
        </h1>
        <div className={st.projectProgress}>
          <ProgressCard
            title="Completed"
            colorScheme="green"
            score={parseFloat(completedTasks)}
          ></ProgressCard>
          <ProgressCard
            title="In Progress"
            colorScheme="blue"
            score={parseFloat(inProgressTasks)}
          ></ProgressCard>
          <ProgressCard
            title="Not Started"
            colorScheme="red"
            score={parseFloat(notStartedTasks)}
          ></ProgressCard>
        </div>

        <div className={st.teamMembers}>
          <div className={st.teamMembersHeader}>
            <h2>{t("Team Members")}</h2>
            <FontAwesomeIcon
              icon={faPlus}
              className={st.addIcon}
              onClick={() => modalRef.current.open()}
            ></FontAwesomeIcon>
          </div>
          {memberInfo &&
            memberInfo.map((memb) => (
              <TeamMember
                key={memb.email}
                name={memb.name}
                email={memb.email}
              ></TeamMember>
            ))}
        </div>
      </div>

      <Modal ref={modalRef}>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <h3 className="modal-title">{t("Add New Team Member")}</h3>
          <label htmlFor="teamMemberEmail">{t("Please Enter Team Member Email:")}</label>
          <input
            type="email"
            id="teamMemberEmail"
            name="teamMemberEmail"
            placeholder={t("Enter Email")}
          ></input>
          <div className={st.buttons}>
            <button onClick={() => modalRef.current.close()}>{t("Close")}</button>
            <button type="submit">{t("Add")}</button>
          </div>
        </form>
      </Modal>
    </>
  )
}
