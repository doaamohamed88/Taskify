import styles from "../../pages/AuthenticationPage/AuthenticationPage.module.css";

const ForgetPasswordForm = ({ onChange }) => {
  return (
    <>
      <h1 className={`${styles.formTitle}`}>Forget password</h1>
      <input
        className={`${styles.formInput}`}
        type="email"
        placeholder="Email"
        name="email"
        onChange={onChange}
      />
      <input
        className={`${styles.formInput}`}
        type="submit"
        value={"Reset Password"}
      />
      <hr className={`${styles.divider}`} />
      <p>Don't have an account? Create one</p>
    </>
  );
};

export default ForgetPasswordForm;
