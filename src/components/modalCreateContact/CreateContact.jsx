import { useContext } from "react";
import { userContext } from "../../context";
import { AiFillCloseCircle } from "react-icons/ai";
import { IMaskInput } from "react-imask";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.scss";
import { schemaContact } from "../../validators";

const ModalCreateContact = () => {
  const { isModalCreate, openModal, contactCreate, setInput } = useContext(userContext);

  const { handleSubmit, register } = useForm({
    resolver: yupResolver(schemaContact),
  });

  return isModalCreate ? (
    <section className="modal">
      <div className="div-modal">
        <div className="header-modal">
          <h3>Criar contato</h3>
          <button onClick={() => openModal()}>
            <AiFillCloseCircle />
          </button>
        </div>
        <form onSubmit={handleSubmit(contactCreate)}>
          <input type="text" placeholder="Name" {...register("name")} />
          <input type="text" placeholder="Email" {...register("email")} />
          <IMaskInput
            mask="(00) 0 0000-0000"
            placeholder="Telefone"
            onAccept={(value) => {
              setInput(value);
            }}
          />
          <button type="submit">Adicionar</button>
        </form>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default ModalCreateContact;
