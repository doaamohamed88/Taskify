import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { getUserByEmail } from "../../services/userService";
import { sendOTP } from "../../services/otpService";
import OTPForm from "./OTPForm";
import styles from "../../pages/AuthenticationPage/AuthenticationPage.module.css";

let user = null;

const ForgetPasswordForm = () => {
  const [registered, setRegistered] = useState(false);

  const {
    register,
    handleSubmit: submitHandler,
    formState: { errors },
    setError,
  } = useForm();

  const handleSubmit = async ({ email }) => {
    try {
      user = await getUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      await sendOTP(email);
      setRegistered(true);
    } catch (error) {
      setError("root", {
        message: error.message,
      });
    }
  };

  return (
    <>
      {registered ? (
        <OTPForm user={user} />
      ) : (
        <form
          className={`${styles.formContainer}`}
          onSubmit={submitHandler(handleSubmit)}
        >
          <h1 className={`${styles.formTitle}`}>Forget password</h1>
          {errors.root && (
            <p className={`${styles.errorMsg}`}>{errors.root.message}</p>
          )}
          <input
            className={`${styles.formInput} ${
              errors.email && `${styles.error}`
            }`}
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
        </form>
      )}
    </>
  );
};

export default ForgetPasswordForm;
