import { useEffect } from "react";
import { Link } from "react-router";
import styles from "../../pages/AuthenticationPage/AuthenticationPage.module.css";

const LoginForm = ({ register, reset, errors }) => {
  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <>
      <h1 className={`${styles.formTitle}`}>Welcome back, login to continue</h1>
      <input
        className={`${styles.formInput}`}
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
        <p className={`${styles.error}`}>{errors.email.message}</p>
      )}
      <input
        className={`${styles.formInput}`}
        type="password"
        placeholder="Password"
        name="password"
        {...register("password", { required: "This field is required" })}
      />
      {errors.password && (
        <p className={`${styles.error}`}>{errors.password.message}</p>
      )}
      <input className={`${styles.formInput}`} type="submit" value={"Login"} />
      <Link className={`${styles.link}`} to={`/forget-password`}>
        Forget Password?
      </Link>
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

export default LoginForm;
