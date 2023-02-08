import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { schemaLogin } from "../../validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { userContext } from "../../context";
import './style.scss'

const Login = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const { login } = useContext(userContext);

  return (
    <section className="modal-login">
      <div className="div-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(login)}>
          <input type="text" placeholder="Email" {...register("email")} />
          <input type="text" placeholder="Senha" {...register("password")} />
          <button type="submit">Login</button>
        </form>
        <span className="span-login">
          Não possui conta?
          <p>
            <Link to="/register"> Criar conta</Link>
          </p>
        </span>
      </div>
    </section>
  );
};

export default Login;
