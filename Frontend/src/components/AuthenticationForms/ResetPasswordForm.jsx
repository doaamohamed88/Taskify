import { useState } from "react";
import { useForm } from "react-hook-form";
import { updatePassword } from "../../services/userService";
import styles from "../../pages/AuthenticationPage/AuthenticationPage.module.css";
import { Link } from "react-router";

const ResetPasswordForm = ({ user }) => {
  const [changed, setChanged] = useState(false);

  const {
    register,
    handleSubmit: submitHandler,
    formState: { errors },
    setError,
    getValues,
  } = useForm();

  const handleSubmit = async ({ password }) => {
    try {
      await updatePassword(user.id, password);
      setChanged(true);
    } catch (error) {
      setError("root", {
        message: error.message,
      });
    }
  };
  return (
    <form
      className={`${styles.formContainer}`}
      onSubmit={submitHandler(handleSubmit)}
    >
      <h1 className={`${styles.formTitle}`}>Create new password</h1>
      {(() => {
        if (errors.root) {
          return <p className={`${styles.errorMsg}`}>{errors.root.message}</p>;
        }

        if (changed) {
          return (
            <p className={`${styles.successMsg}`}>
              Password changed successfully.
              <Link className={`${styles.link}`} to={`/`}>
                Login.
              </Link>
            </p>
          );
        }
      })()}
      <input
        className={`${styles.formInput} ${
          errors.password && `${styles.error}`
        }`}
        type="password"
        placeholder="Password"
        name="password"
        {...register("password", { required: "This field is required" })}
      />
      {errors.password && (
        <p className={`${styles.errorMsg}`}>{errors.password.message}</p>
      )}
      <input
        className={`${styles.formInput} ${
          errors.confirmPassword && `${styles.error}`
        }`}
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        {...register("confirmPassword", {
          required: "This field is required",
          validate: (value) =>
            value === getValues("password") || "Passwords do not match",
        })}
      />
      {errors.confirmPassword && (
        <p className={`${styles.errorMsg}`}>{errors.confirmPassword.message}</p>
      )}
      <input
        className={`${styles.formInput}`}
        type="submit"
        value={"Change Password"}
      />
    </form>
  );
};

export default ResetPasswordForm;
