import { useLocation } from "react-router"
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchUserBoards } from "../../store/board/BoardActions";
import styles from './Boards.module.css'
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import BoardCard from "../../Components/BoardCard/BoardCard";
import {
    cardVariants,
    textVariants,
} from "../../Components/UI/LandingAnimation";
import noboard from '../../assets/noboards.png'
function Boards() {
    const location = useLocation().pathname;
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem("accessToken");
    const user = accessToken ? jwtDecode(accessToken) : null;
    const userId = user?.id;
    const { t } = useTranslation();
    const { data: boards, loading, error } = useSelector((state) => state.boards);

    const createdBoards = boards
        .filter((board) => board.owner === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const involvedBoards = boards
        .filter(
            (board) =>
                board.members.find((member) => String(member.id) === String(userId)))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    // Remove boards from involvedBoards that are already in createdBoards or where the user is both owner and member
    const createdBoardIds = new Set(createdBoards.map(b => b.id));
    const filteredInvolvedBoards = involvedBoards.filter(b => !createdBoardIds.has(b.id) && b.owner !== userId);

    useEffect(() => {
        dispatch(fetchUserBoards());
    }, [dispatch]);

    if (loading) return <p>{t("Loading...")}</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    return (
        <>
            {location === '/createdboardsPage' && (
                <div className={styles.container}>
                    {(createdBoards.length === 0) && (
                        <div className={styles.img_conatiner}>
                            <img src={noboard} className={styles.img} alt="No boards" />
                        </div>
                    )}

                    {createdBoards.length > 0 && (
                        <div className={styles.cards_section}>
                            <motion.p
                                className={styles.boardName}
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {t("Created")}
                            </motion.p>

                            <div className={styles.cards}>
                                {createdBoards.map((board) => (
                                    <motion.div
                                        className={styles.card}
                                        key={board.id}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <BoardCard board={board} boardType="created" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            {location === '/involvedboardsPage' && (
                <div className={styles.container}>
                    {(filteredInvolvedBoards.length === 0) && (
                        <div className={styles.img_conatiner}>
                            <img src={noboard} className={styles.img} alt="No boards" />
                        </div>
                    )}

                    {filteredInvolvedBoards.length > 0 && (
                        <div className={styles.cards_section}>
                            <motion.p
                                className={styles.boardName}
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {t("Involved")}
                            </motion.p>

                            <div className={styles.cards}>
                                {filteredInvolvedBoards.map((board) => (
                                    <motion.div
                                        className={styles.card}
                                        key={board.id}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <BoardCard board={board} boardType="involved" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

        </>
    )
}

export default Boards
