import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { verifyOTP } from "../../services/otpService";
import { verifyUser } from "../../services/userService";
import styles from "../../pages/AuthenticationPage/AuthenticationPage.module.css";
import ResetPasswordForm from "./ResetPasswordForm";

const OTPForm = ({ user, verifyAccount = false }) => {
  const [verified, setVerified] = useState(false);

  const {
    register,
    handleSubmit: submitHandler,
    setFocus,
    setError,
    formState: { errors },
  } = useForm();

  const handleSubmit = async (data) => {
    const otp = Object.values(data).join("");
    const isValid = await verifyOTP(user.email, otp);

    if (isValid) {
      if (verifyAccount) await verifyUser(user.id);
      setVerified(true);
    } else {
      setError("root", { message: "Invalid OTP" });
    }
  };

  return (
    <>
      {verified && !verifyAccount ? (
        <ResetPasswordForm user={user} />
      ) : (
        <form
          className={`${styles.formContainer}`}
          onSubmit={submitHandler(handleSubmit)}
        >
          <p className={`${styles.formTitle}`}>
            A verification code has been sent to your email, please enter it
            below.
          </p>
          {(() => {
            if (errors.root) {
              return (
                <p className={`${styles.errorMsg}`}>{errors.root.message}</p>
              );
            }

            if (verified) {
              return (
                <p className={`${styles.successMsg}`}>
                  Account verified successfully. You can now{" "}
                  <Link className={`${styles.link}`} to={`/`}>
                    Login.
                  </Link>
                </p>
              );
            }
          })()}
          <div className={`${styles.otpContainer}`}>
            {[...Array(6)].map((_, i) => (
              <input
                className={`${styles.formInput} ${styles.otpInput}`}
                key={i}
                maxLength={1}
                {...register(`otp${i}`, {
                  required: true,
                  onChange: (e) => {
                    if (e.target.value && i < 5) setFocus(`otp${i + 1}`);
                  },
                })}
              />
            ))}
          </div>
          <input
            className={`${styles.formInput}`}
            type="submit"
            value="Submit"
          />
        </form>
      )}
    </>
  );
};

export default OTPForm;
