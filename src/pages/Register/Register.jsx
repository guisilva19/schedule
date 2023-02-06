import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../../service";
import { schemaRegister } from "../../validators";
import "./style.scss";

const Register = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  const nav = useNavigate();

  const registerUser = (data) => {
    Api.post("/register", data).then((response) => {
      toast.success("Registro feito", { autoClose: 2000 });
      nav("/login", data);
    });
  };

  return (
    <section>
      <div className="div-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(registerUser)}>
          <input type="text" placeholder="name" {...register("name")} />
          <input type="text" placeholder="email" {...register("email")} />
          <input type="text" placeholder="password" {...register("password")} />
          <input
            type="text"
            placeholder="telephone"
            {...register("telephone")}
          />
          <button type="submit">Registrar</button>
        </form>
        <span>
          Ja possui conta?{" "}
          <p>
            {" "}
            <Link to="/login">Faça Login</Link>
          </p>
        </span>
      </div>
    </section>
  );
};

export default Register;
