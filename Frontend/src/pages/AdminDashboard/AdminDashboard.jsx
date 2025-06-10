import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ProgressCard from "../../Components/ProgressCard/ProgressCard"
import TeamMember from "../../Components/teamMemberCard/TeamMember"
import styles from "./AdminDashboard.module.css"
import { useTranslation } from "react-i18next"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import Modal from "../../Components/Modal/Modal"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedBoard } from "../../store/selectedBoard"
import { getBoardById, updateBoard } from "../../services/boardService"
import { getUserByEmail, updateUser } from "../../services/userService"
import { set } from "react-hook-form"
import { hasMinLength, isEmail, isNotEmpty } from "../../utils/validation"

export default function AdminDashboard() {
  const modalRef = useRef()
  const { t } = useTranslation()

  const dispatch = useDispatch()
  // const userBoardId = useSelector((state) => state.user.boards[0].id)
  const boardData = useSelector((state) => state.selectedBoard)
  const adminInfo = useSelector((state) => state.user)

  const [totalTasks, setTotalTasks] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)
  const [inProgressTasks, setInProgressTasks] = useState(0)
  const [notStartedTasks, setNotStartedTasks] = useState(0)
  const [memberInfo, setMemberInfo] = useState([])
  const [emailInput, setEmailInput] = useState("")
  const [emailError, setEmailError] = useState("")

  // useEffect(() => {
  //   const fetchBoard = async () => {
  //     let board = null
  //     if (userBoardId) {
  //       try {
  //         board = await getBoardById(userBoardId)
  //         dispatch(setSelectedBoard(board))
  //       } catch (error) {
  //         console.error("Error fetching board:", error)
  //       }
  //     }
  //   }
  //   fetchBoard()
  // }, [userBoardId])

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
        (boardData.tasks.filter((task) => task.status === "Done").length /
          boardData.tasks.length) *
        100
      )
    )
    setInProgressTasks(
      boardData.tasks.length > 0 &&
      Math.round(
        (boardData.tasks.filter((task) => task.status === "In Progress").length /
          boardData.tasks.length) *
        100
      )
    )
    setNotStartedTasks(
      boardData.tasks.length > 0 &&
      Math.round(
        (boardData.tasks.filter((task) => task.status === "To Do").length /
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

  function addMember(e) {
    e.preventDefault()
    if (!isEmail(emailInput) || !isNotEmpty(emailInput) || !hasMinLength(emailInput, 5)) {
      setEmailError("Please enter a valid email address")
    } else if (boardData.members.some((member) => member.email === emailInput)) {
      setEmailError("Member already exists")
    } else {
      getUserByEmail(emailInput).then((res) => {
        const updatedBoard = { ...boardData, members: [...boardData.members, { score: 0, email: res.email }] }
        dispatch(setSelectedBoard(updatedBoard))
        updateBoard(boardData.id, updatedBoard)
        updateUser(res.id, { boards: [...res.boards, { id: boardData.id }] })
        resetInput()
        modalRef.current.close()
      }).catch((err) => {
        setEmailError("User does not exist")
      })
    }
  }

  function resetInput() {
    setEmailInput("")
    setEmailError("")
  }

  return (
    <>
      <div className={styles.grid}>
        <h1>
          {t("Welcome back, ")}
          {adminInfo.name} 👋
        </h1>
        <div className={styles.projectProgress}>
          <ProgressCard
            title="Completed"
            colorScheme="green"
            score={parseFloat(completedTasks || 0)}
          ></ProgressCard>
          <ProgressCard
            title="In Progress"
            colorScheme="blue"
            score={parseFloat(inProgressTasks || 0)}
          ></ProgressCard>
          <ProgressCard
            title="Not Started"
            colorScheme="red"
            score={parseFloat(notStartedTasks || 0)}
          ></ProgressCard>

        </div>

        <div className={styles.teamMembers}>
          <div className={styles.teamMembersHeader}>
            <h2>{t("Team Members")}</h2>
            <FontAwesomeIcon
              icon={faPlus}
              className={styles.addIcon}
              onClick={() => {
                resetInput()
                modalRef.current.open()
              }}
            ></FontAwesomeIcon>
          </div>
          {memberInfo &&
            memberInfo.map((memb) => (
              <TeamMember key={memb.email} name={memb.name} email={memb.email}></TeamMember>
            ))}
        </div>
      </div>

      <Modal ref={modalRef}>
        <form action="" onSubmit={(e) => addMember(e)}>
          <h3 className="modal-title">{t("Add New Team Member")}</h3>
          <label htmlFor="teamMemberEmail">{t("Please Enter Team Member Email:")}</label>
          <input
            type="email"
            id="teamMemberEmail"
            name="teamMemberEmail"
            placeholder={t("Enter Email")}
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          ></input>
          <span className={styles.error}>{emailError}</span>
          <div className={styles.buttons}>
            <button
              onClick={() => {
                modalRef.current.close()
              }}
            >
              {t("Close")}
            </button>
            <button type="submit">{t("Add")}</button>
          </div>
        </form>
      </Modal>

    </>
  )
}
