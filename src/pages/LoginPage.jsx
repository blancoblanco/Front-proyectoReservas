import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";



function LoginPage() {

    const { register, handleSubmit } = useForm();
   const {signin}= useAuth()
    const onSubmit = handleSubmit((data)=>{
        signin(data)
    })

  return (
    <div>
          <form onSubmit={onSubmit} className="login__form">
        <h1 className="login__title">login</h1>

        {/* correo */}
        <div className="login__box">
          <i className="bx bx-envelope"></i>
          <div className="login__box-input">
            <input
              type="email"
              className="login__input"
              placeholder=" "
              {...register("correo", { required: true })}
            />
            <label className="login__label" htmlFor="">
              Correo
            </label>
          </div>
        </div>

        {/* contraseña */}
        <div className="login__box">
          <i className="bx bx-lock-alt"></i>
          <div className="login__box-input">
            <input
              type="password"
              className="login__input"
              placeholder=" "
              {...register("contrasena", { required: true })}
            />
            <label className="login__label" htmlFor="">
              Contraseña
            </label>
          </div>
        </div>

        <div className="login__check">
          <div className="login__check-group">
            <input
              type="checkbox"
              className="login__check-input"
              id="remember"
            />
            <label htmlFor="remember" className="login__check-label">
              Recuérdame
            </label>
          </div>

          <a href="#" className="login__forgot">
            Forgot Password?
          </a>
        </div>

        <button className="login__button" type="submit">
          Registrarse
        </button>

        <p className="login__register">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  )
}

export default LoginPage