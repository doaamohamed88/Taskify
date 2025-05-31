import { Link } from "react-router";
import styles from "../../pages/AuthenticationPage/AuthenticationPage.module.css";

const RegisterForm = ({ onChange }) => {
  return (
    <>
      <h1 className={`${styles.formTitle}`}>Create an account</h1>
      <input
        className={`${styles.formInput}`}
        type="email"
        placeholder="Email"
        name="email"
        onChange={onChange}
      />
      <input
        className={`${styles.formInput}`}
        type="password"
        placeholder="Password"
        name="password"
        onChange={onChange}
      />
      <input
        className={`${styles.formInput}`}
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={onChange}
      />
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
