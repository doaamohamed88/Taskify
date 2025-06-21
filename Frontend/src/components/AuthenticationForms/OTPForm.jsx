import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { verifyOTP, sendOTP } from "../../services/otpService";
import { registerUser } from "../../services/userService";
import styles from "../../pages/AuthenticationPage/AuthenticationPage.module.css";
import ResetPasswordForm from "./ResetPasswordForm";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

const OTPForm = ({ user, verifyAccount = false }) => {
  const [verified, setVerified] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [expiryTime, setExpiryTime] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [otpGeneration, setOtpGeneration] = useState(0); // NEW: for timer reset

  const {
    register,
    handleSubmit: submitHandler,
    setFocus,
    setError,
    formState: { errors },
  } = useForm();

  const handleSubmit = async (data) => {
    if (remaining <= 0) {
      setError("root", { message: "OTP has expired. Please resend OTP." });
      return;
    }
    const otp = Object.values(data).join("");
    const isValid = await verifyOTP(user.email, otp);

    if (isValid) {
      if (verifyAccount) {
        await registerUser(user.name, user.email, user.password);
      }
      setVerified(true);
    } else {
      setError("root", { message: "Invalid OTP" });
    }
  };

  useEffect(() => {
    // Set expiry time to 5 minutes from now on mount or resend
    const now = new Date();
    const expires = new Date(now.getTime() + 5 * 60 * 1000);
    setExpiryTime(expires);
    setRemaining(5 * 60);
    let interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((expires - new Date()) / 1000));
      setRemaining(diff);
      if (diff <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpGeneration]); // CHANGED: depend on otpGeneration

  const handleResendOTP = async () => {
    setResendDisabled(true);
    try {
      await sendOTP(user.email);
      setResendMessage("A new OTP has been sent to your email.");
      setOtpGeneration((prev) => prev + 1); // NEW: force timer reset
    } catch (error) {
      setResendMessage("Failed to resend OTP. Please try again.");
    }
    setTimeout(() => setResendDisabled(false), 30000); // 30s cooldown
  };

  const formVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.5 } },
  };

  const otpInputVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, delay: i * 0.1 },
    }),
  };

  useEffect(() => {
    // On first mount, start timer
    setOtpGeneration((prev) => prev + 1);
  }, []);

  return (
    <>
      {verified && !verifyAccount ? (
        <ResetPasswordForm user={user} />
      ) : (
        <motion.form
          className={`${styles.parentContainer}`}
          onSubmit={submitHandler(handleSubmit)}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.p
            className={`${styles.formTitle}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            A verification code has been sent to your email, please enter it
            below.
          </motion.p>
          {(() => {
            if (errors.root) {
              return (
                <motion.p
                  className={`${styles.errorMsg}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }} // Slower transition for error message
                >
                  {errors.root.message}
                </motion.p>
              );
            }

            if (verified) {
              return (
                <motion.p
                  className={`${styles.successMsg}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Account verified successfully. You can now{" "}
                  <Link className={`${styles.link}`} to={`/`}>
                    Login.
                  </Link>
                </motion.p>
              );
            }
          })()}
          <div className={`${styles.otpContainer}`}>
            {[...Array(6)].map((_, i) => (
              <motion.input
                className={`${styles.formInput} ${styles.otpInput}`}
                key={i}
                maxLength={1}
                custom={i}
                variants={otpInputVariants}
                initial="hidden"
                animate="visible"
                {...register(`otp${i}`, {
                  required: true,
                  onChange: (e) => {
                    if (e.target.value && i < 5) setFocus(`otp${i + 1}`);
                  },
                })}
              />
            ))}
          </div>
          <motion.input
            className={`${styles.formInput}`}
            type="submit"
            value="Submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={resendDisabled}
            style={{ marginTop: "1rem" }}
          >
            Resend OTP
            {resendDisabled && remaining > 0
              ? ` (${Math.floor(remaining / 60)}:${(remaining % 60)
                .toString()
                .padStart(2, "0")})`
              : ""}
          </button>
          {remaining > 0 && (
            <p className={styles.infoMsg}>
              OTP expires in {Math.floor(remaining / 60)}:{(remaining % 60).toString().padStart(2, "0")} minutes
            </p>
          )}
          {resendMessage && (
            <p className={styles.infoMsg}>{resendMessage}</p>
          )}
        </motion.form>
      )}
    </>
  );
};

export default OTPForm;
