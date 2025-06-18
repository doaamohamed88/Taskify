import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { jwtDecode } from "jwt-decode";
import { login } from "../../services/userService";
import styles from "../../pages/AuthenticationPage/AuthenticationPage.module.css";

const LoginForm = () => {
  const userDispatch = useDispatch();

  const {
    register,
    handleSubmit: submitHandler,
    formState: { errors },
    setError,
  } = useForm();

  const handleSubmit = async ({ email, password }) => {
    try {
      const response = await login(email, password);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      const decoded = jwtDecode(response.accessToken);
      userDispatch(setUser(decoded));
    } catch (error) {
      setError("root", {
        message: error.message,
      });
    }
  };

  return (
    <>
      <div className={`${styles.imageFormContainer}`}>
        <div className={`${styles.imageContainer}`}>
          <img src="/images/login bg.jpg" alt="Register" />
        </div>

        <form
          className={`${styles.formContainer}`}
          onSubmit={submitHandler(handleSubmit)}
        >
          <h1 className={`${styles.formTitle}`}>
            Welcome back, login to continue
          </h1>
          {errors.root && (
            <p className={`${styles.errorMsg}`}>{errors.root.message}</p>
          )}
          <input
            className={`${styles.formInput} ${errors.email ? styles.error : ""
              }`}
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
            className={`${styles.formInput} ${errors.password ? styles.error : ""
              }`}
            type="password"
            placeholder="Password"
            name="password"
            {...register("password", { required: "This field is required" })}
          />
          {errors.password && (
            <p className={`${styles.errorMsg}`}>{errors.password.message}</p>
          )}
          <input
            className={`${styles.formInput}`}
            type="submit"
            value={"Login"}
          />
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
        </form>
      </div>
    </>
  );
};

export default LoginForm;
