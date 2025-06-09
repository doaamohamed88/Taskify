import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { verifyOTP } from "../../services/otpService";
import { verifyUser } from "../../services/userService";
import styles from "../../pages/AuthenticationPage/AuthenticationPage.module.css";
import ResetPasswordForm from "./ResetPasswordForm";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

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
        </motion.form>
      )}
    </>
  );
};

export default OTPForm;
