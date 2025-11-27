import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const { signUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/productos");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
  });

  return (
    <div className="login">
      <form onSubmit={onSubmit} className="login__form">
        <h1 className="login__title">Register</h1>

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

        {/* nombre */}
        <div className="login__box">
          <i className="bx bx-user"></i>
          <div className="login__box-input">
            <input
              type="text"
              className="login__input"
              placeholder=" "
              {...register("nombre", { required: true })}
            />
            <label className="login__label" htmlFor="">
              Nombre
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
          ya tienes una cuenta? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
