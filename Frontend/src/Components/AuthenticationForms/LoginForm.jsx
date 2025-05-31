import styles from "../../pages/AuthenticationPage/AuthenticationPage.module.css";

const LoginForm = ({ onChange }) => {
  return (
    <>
      <h1 className={`${styles.formTitle}`}>Welcome back, login to continue</h1>
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
      <input className={`${styles.formInput}`} type="submit" value={"Login"} />
      <hr className={`${styles.divider}`} />
      <p>Don't have an account? Create one</p>
    </>
  );
};

export default LoginForm;
