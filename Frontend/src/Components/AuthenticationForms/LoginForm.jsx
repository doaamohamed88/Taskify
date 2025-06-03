import { Link } from "react-router"
import { useForm } from "react-hook-form"
import styles from "../../pages/AuthenticationPage/AuthenticationPage.module.css"
import { useDispatch } from "react-redux"
import { setUser } from "../../store/userSlice"
import { login } from "../../services/userService"

const LoginForm = () => {
  const userDispatch = useDispatch()

  const {
    register,
    handleSubmit: submitHandler,
    formState: { errors },
    setError,
  } = useForm()

  const handleSubmit = async ({ email, password }) => {
    try {
      const response = await login(email, password)
      userDispatch(setUser(response))
    } catch (error) {
      setError("root", {
        message: error.message,
      })
    }
  }

  return (
    <>
      <form className={`${styles.formContainer}`} onSubmit={submitHandler(handleSubmit)}>
        <h1 className={`${styles.formTitle}`}>Welcome back, login to continue</h1>
        {errors.root && <p className={`${styles.errorMsg}`}>{errors.root.message}</p>}
        <input
          className={`${styles.formInput} ${errors.email ? styles.error : ""}`}
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
        {errors.email && <p className={`${styles.errorMsg}`}>{errors.email.message}</p>}
        <input
          className={`${styles.formInput} ${errors.password ? styles.error : ""}`}
          type="password"
          placeholder="Password"
          name="password"
          {...register("password", { required: "This field is required" })}
        />
        {errors.password && <p className={`${styles.errorMsg}`}>{errors.password.message}</p>}
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
      </form>
    </>
  )
}

export default LoginForm
