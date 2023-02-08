import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { Link } from "react-router-dom";
import { userContext } from "../../context";
import { schemaRegister } from "../../validators";

import "./style.scss";

const Register = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  const { registerUser, setInputRegister } = useContext(userContext);

  return (
    <section className="modal-register">
      <div className="div-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(registerUser)}>
          <input type="text" placeholder="Name" {...register("name")} />
          <input type="text" placeholder="Email" {...register("email")} />
          <input type="text" placeholder="Password" {...register("password")} />
          <IMaskInput
            mask="(00) 0 0000-0000"
            placeholder="DDD + Telefone"
            onAccept={(value) => {
              setInputRegister(value);
            }}
          />
          <button type="submit">Registrar</button>
        </form>
        <span className="span-register">
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
