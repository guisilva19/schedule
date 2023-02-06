import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { schemaLogin } from "../../validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { userContext } from "../../context";
import Api from "../../service";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const { setUser } = useContext(userContext);
  const nav = useNavigate();
  const login = (data) => {
    Api.post("/session", data)
      .then((response) => {
        const token = response.data;
        localStorage.setItem("token", token);
        toast.success("Login feito com sucesso!", { autoClose: 2000 });

        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        Api.get("/user").then((response) => setUser(response.data));
        nav("/dashboard", { replace: true });
      })
      .catch((error) => {
        toast.error("Email ou senha errado", { autoClose: 2000 });
      });
  };
  return (
    <section>
      <div className="div-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(login)}>
          <input type="text" placeholder="email" {...register("email")} />
          <input type="text" placeholder="senha" {...register("password")} />
          <button type="submit">Login</button>
        </form>
        <span>
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
