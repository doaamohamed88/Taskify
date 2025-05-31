import { useRef } from "react";
import ForgetPasswordForm from "../../components/AuthenticationForms/ForgetPasswordForm";
import LoginForm from "../../components/AuthenticationForms/LoginForm";
import RegisterForm from "../../components/AuthenticationForms/RegisterForm";
import styles from "./AuthenticationPage.module.css";

const AuthenticationPage = ({ type }) => {
  const values = useRef({});

  const handleChange = (e) => {
    values.current[e.target.name] = e.target.value;
  };

  return (
    <div className={`${styles.mainContainer}`}>
      <form className={`${styles.formContainer}`}>
        {(() => {
          if (type === "login") return <LoginForm onChange={handleChange} />;

          if (type === "register")
            return <RegisterForm onChange={handleChange} />;

          if (type === "forgetPassword")
            return <ForgetPasswordForm onChange={handleChange} />;
        })()}
      </form>
    </div>
  );
};

export default AuthenticationPage;
