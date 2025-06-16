import { useEffect, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import SelectStyle from "../UI/SelectStyle";
import { isNotEmpty } from "../../utils/validation";
import styles from "./CreateBoardForm.module.css";
import { loadUserOptions } from "../../utils/loadUserOptions";
import { authFetch } from "../../helpers/authFetch";
import { useDispatch } from "react-redux";
import { fetchUserBoards } from "../../store/board/BoardActions";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function CreateBoardForm({ onClose, initialData = {}, isEdit = false, onSubmit }) {
    const { t } = useTranslation();
    const boardTitleRef = useRef();
    const membersRef = useRef();
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isEdit && initialData) {
            if (boardTitleRef.current) boardTitleRef.current.value = initialData.title || "";
            if (membersRef.current && initialData.members) {
                const memberOptions = (initialData.members || []).map((m) => ({ value: m.id, label: m.name || m.email }));
                membersRef.current.setValue(memberOptions);
            }
        }
    }, [isEdit, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors([]);

        const title = boardTitleRef.current?.value;
        const selectInstance = membersRef.current;
        const selectedMembers = selectInstance?.getValue() || [];
        const selectedMemberIds = selectedMembers.map((opt) => opt.value);

    const validationErrors = [];
    if (!isNotEmpty(title)) validationErrors.push("Board title is required");
    if (selectedMemberIds.length === 0)
      validationErrors.push("At least one member is required");
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

        try {
            if (isEdit && onSubmit) {
                await onSubmit({ ...initialData, title, members: selectedMemberIds });
            } else {
                await authFetch("/boards", {
                    method: "POST",
                    body: JSON.stringify({ title, members: selectedMemberIds }),
                });
                boardTitleRef.current.value = "";
                if (selectInstance) selectInstance.clearValue();
                dispatch(fetchUserBoards());
                toast.success("Board created successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
                onClose();
            }
        } catch {
            setErrors(["Something went wrong."]);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <p>{isEdit ? t("Edit Board") : t("Create Board")}</p>
            <div className={styles.input_container}>
                <label htmlFor="title">{t("Board Title")}</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter board title"
                    ref={boardTitleRef}
                    disabled={isSubmitting}
                />
            </div>
            <div className={styles.input_container}>
                <label htmlFor="members">{t("Members")}</label>
                <AsyncSelect
                    isMulti
                    cacheOptions
                    defaultOptions={false}
                    loadOptions={loadUserOptions}
                    ref={membersRef}
                    placeholder={t("Search and select members...")}
                    styles={SelectStyle}
                    isDisabled={isSubmitting}
                />
            </div>
            <div className={styles.buttons}>
                <button type="button" className={styles.close} onClick={onClose} disabled={isSubmitting}>
                    {t("Close")}
                </button>
                <button type="submit" className={styles.main_button} disabled={isSubmitting}>
                    {isSubmitting ? (isEdit ? t("Updating...") : t("Creating...")) : (isEdit ? t("Update") : t("Create"))}
                </button>
            </div>
            {errors.length > 0 && (
                <div className={styles.error}>
                    {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
        </form>
    );
}
