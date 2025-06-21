import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ProgressCard from "../../Components/ProgressCard/ProgressCard"
import TeamMember from "../../Components/teamMemberCard/TeamMember"
import styles from "./AdminDashboard.module.css"
import { useTranslation } from "react-i18next"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import Modal from "../../Components/Modal/Modal"
import { useDispatch } from "react-redux"
import { setSelectedBoard } from "../../store/selectedBoardSlice"
import { updateBoard } from "../../services/boardService"
import { getUserByEmail, updateUser } from "../../services/userService"
import { hasMinLength, isEmail, isNotEmpty } from "../../utils/validation"
import useSelectedBoard from "../../hooks/useSelectedBoard"
import { toast } from "react-toastify"
import * as FaIcons from 'react-icons/fa6'
export default function AdminDashboard() {
  const modalRef = useRef();
  const { t } = useTranslation();

  const dispatch = useDispatch()
  // const userBoardId = useSelector((state) => state.user.boards[0].id)
  const { selectedBoard } = useSelectedBoard();

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
    if (selectedBoard) {
      calculateProgress()
      setMemberInfo([])
      getMemberInfo()
    }
  }, [selectedBoard])

  function calculateProgress() {
    setTotalTasks(selectedBoard.tasks.length)
    setCompletedTasks(
      selectedBoard.tasks.length > 0 &&
      Math.round(
        (selectedBoard.tasks.filter((task) => task.status === "Done").length /
          selectedBoard.tasks.length) *
        100
      )
    )
    setInProgressTasks(
      selectedBoard.tasks.length > 0 &&
      Math.round(
        (selectedBoard.tasks.filter((task) => task.status === "In Progress").length /
          selectedBoard.tasks.length) *
        100
      )
    )
    setNotStartedTasks(
      selectedBoard.tasks.length > 0 &&
      Math.round(
        (selectedBoard.tasks.filter((task) => task.status === "To Do").length /
          selectedBoard.tasks.length) *
        100
      )
    )
  }

  function getMemberInfo() {
    selectedBoard.members.forEach((memb) => {
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
    } else if (selectedBoard.members.some((member) => member.email === emailInput)) {
      setEmailError("Member already exists")
    } else {
      getUserByEmail(emailInput).then((res) => {
        const updatedBoard = { ...selectedBoard, members: [...selectedBoard.members, { score: 0, email: res.email, name: res.name }] }
        dispatch(setSelectedBoard(updatedBoard))
        updateBoard(selectedBoard.id, updatedBoard)
        updateUser(res.id, { boards: [...res.boards, { id: selectedBoard.id }] })
        resetInput()
        toast.success("Member added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
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
    <div className={styles.mainContainer}>
      <div className={styles.boardHeaderCard}>
        <div className={styles.boardMeta}>
          <span className={styles.boardLabel}>{t("Active Board")}</span>
          <FaIcons.FaClipboardList className={styles.boardIcon} />
        </div>
        <h1 className={styles.boardName}>{selectedBoard?.title && ` ${selectedBoard.title}`}</h1>
        <div className={styles.boardStats}>
          <span>
            {selectedBoard?.tasks && selectedBoard.tasks.length}{" "}
            {selectedBoard?.tasks && selectedBoard.tasks.length === 1 ? t("Task") : t("Tasks")}
          </span>
          <span>•</span>
          <span>
            {selectedBoard?.members && selectedBoard.members.length}{" "}
            {selectedBoard?.members && selectedBoard.members.length === 1 ? t("Member") : t("Members")}
          </span>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.projectProgress}>
          <ProgressCard
            title="Not Started"
            colorScheme="red"
            score={parseFloat(notStartedTasks || 0)}
          ></ProgressCard>
          <ProgressCard
            title="In Progress"
            colorScheme="blue"
            score={parseFloat(inProgressTasks || 0)}
          ></ProgressCard>

          <ProgressCard
            title="Completed"
            colorScheme="green"
            score={parseFloat(completedTasks || 0)}
          ></ProgressCard>
        </div>

        <div className={styles.teamMembers}>
          <div className={styles.teamMembersHeader}>
            <p>{t("Team Members")}</p>
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
        <form action="" onSubmit={(e) => addMember(e)} className={styles.form}>
          <p className="modal-title">{t("Add New Team Member")}</p>
          <label htmlFor="teamMemberEmail">{t("Email")}</label>
          <input
            type="email"
            id="teamMemberEmail"
            name="teamMemberEmail"
            placeholder={t("Please Enter Team Member Email")}
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

    </div>
  )
}
