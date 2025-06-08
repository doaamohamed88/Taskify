import { useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import SelectStyle from "../UI/SelectStyle";
import { isNotEmpty } from "../../utils/validation";
// import { api } from "../../utils/api";
import classes from "./CreateBoardForm.module.css";
import { loadUserOptions } from "../../utils/loadUserOptions";
import { authFetch } from "../../helpers/authFetch";

export default function CreateBoardForm({ onClose }) {
    const boardTitleRef = useRef();
    const membersRef = useRef();
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            const response = await authFetch("/boards", {
                method: "POST",
                body: JSON.stringify({ title, members: selectedMemberIds }),
            });
            console.log("Board created:", response);
            boardTitleRef.current.value = "";
            if (selectInstance) selectInstance.clearValue();
            onClose();
        } catch (error) {
            console.error("Error creating board", error);
            setErrors(["Something went wrong."]);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <p>Create Board</p>
            <div className={classes.input_container}>
                <label htmlFor="title">Board Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter board title"
                    ref={boardTitleRef}
                    disabled={isSubmitting}
                />
            </div>
            <div className={classes.input_container}>
                <label htmlFor="members">Members</label>
                <AsyncSelect
                    isMulti
                    cacheOptions
                    defaultOptions={false}
                    loadOptions={loadUserOptions}
                    ref={membersRef}
                    placeholder="Search and select members..."
                    styles={SelectStyle}
                    isDisabled={isSubmitting}
                />
            </div>
            <div className={classes.buttons}>
                <button type="button" className={classes.close} onClick={onClose} disabled={isSubmitting}>
                    Close
                </button>
                <button type="submit" className={classes.main_button} disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create"}
                </button>
            </div>
            {errors.length > 0 && (
                <div className={classes.error}>
                    {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
        </form>
    );
}
