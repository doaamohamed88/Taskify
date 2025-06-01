import { useEffect } from "react";
import { Link } from "react-router";
import styles from "../../pages/AuthenticationPage/AuthenticationPage.module.css";

const ForgetPasswordForm = ({ register, reset, errors }) => {
  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <>
      <h1 className={`${styles.formTitle}`}>Forget password</h1>
      <input
        className={`${styles.formInput} ${errors.email && `${styles.error}`}`}
        type="text"
        placeholder="Email"
        name="email"
        {...register("email", {
          required: "This field is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        })}
      />
      {errors.email && (
        <p className={`${styles.errorMsg}`}>{errors.email.message}</p>
      )}
      <input
        className={`${styles.formInput}`}
        type="submit"
        value={"Reset Password"}
      />
      <hr className={`${styles.divider}`} />
      <p>
        Don't have an account?{" "}
        <Link className={`${styles.link}`} to={`/register`}>
          Create one
        </Link>
      </p>
    </>
  );
};

export default ForgetPasswordForm;
