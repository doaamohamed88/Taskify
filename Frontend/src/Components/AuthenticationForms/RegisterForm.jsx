import { useEffect, useRef } from "react";
import { Link } from "react-router";
import styles from "../../pages/AuthenticationPage/AuthenticationPage.module.css";

const RegisterForm = ({ register, reset, errors }) => {
  const passwordValues = useRef({});

  useEffect(() => {
    reset();
  }, [reset]);

  const handlePasswordChanges = (e) => {
    passwordValues.current[e.target.name] = e.target.value;
  };

  return (
    <>
      <h1 className={`${styles.formTitle}`}>Create an account</h1>
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
        className={`${styles.formInput} ${
          errors.password && `${styles.error}`
        }`}
        type="password"
        placeholder="Password"
        name="password"
        onChange={handlePasswordChanges}
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
        onChange={handlePasswordChanges}
        {...register("confirmPassword", {
          required: "This field is required",
          validate: () =>
            passwordValues.current.password !==
              passwordValues.current.confirmPassword ||
            "Passwords does not match",
        })}
      />
      {errors.confirmPassword && (
        <p className={`${styles.errorMsg}`}>{errors.confirmPassword.message}</p>
      )}
      <input
        className={`${styles.formInput}`}
        type="submit"
        value={"Register"}
      />
      <hr className={`${styles.divider}`} />
      <p>
        Already have an account?{" "}
        <Link className={`${styles.link}`} to={`/`}>
          Login
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
