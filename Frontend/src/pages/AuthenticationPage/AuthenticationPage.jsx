import ForgetPasswordForm from "../../components/AuthenticationForms/ForgetPasswordForm";
import LoginForm from "../../components/AuthenticationForms/LoginForm";
import RegisterForm from "../../components/AuthenticationForms/RegisterForm";
import styles from "./AuthenticationPage.module.css";
// import waveBackground from "../../assets/waveBackground.svg";

const AuthenticationPage = ({ type }) => {
  return (
    <div className={`${styles.mainContainer}`}>
      {/* <div className={`${styles.imageContainer}`}>
        <img src={waveBackground} alt="background" />
      </div> */}
      {(() => {
        if (type === "login") return <LoginForm />;

        if (type === "register") return <RegisterForm />;

        if (type === "forgetPassword") return <ForgetPasswordForm />;
      })()}
    </div>
  );
};

export default AuthenticationPage;
