import ForgetPasswordForm from "../../components/AuthenticationForms/ForgetPasswordForm";
import LoginForm from "../../components/AuthenticationForms/LoginForm";
import RegisterForm from "../../components/AuthenticationForms/RegisterForm";
import styles from "./AuthenticationPage.module.css";
import { useForm } from "react-hook-form";

const AuthenticationPage = ({ type }) => {
  const {
    register,
    handleSubmit: submitHandler,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={`${styles.mainContainer}`}>
      <form
        className={`${styles.formContainer}`}
        onSubmit={submitHandler(handleSubmit)}
      >
        {(() => {
          if (type === "login")
            return (
              <LoginForm register={register} reset={reset} errors={errors} />
            );

          if (type === "register")
            return (
              <RegisterForm register={register} reset={reset} errors={errors} />
            );

          if (type === "forgetPassword")
            return (
              <ForgetPasswordForm
                register={register}
                reset={reset}
                errors={errors}
              />
            );
        })()}
      </form>
    </div>
  );
};

export default AuthenticationPage;
