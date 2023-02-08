import { useContext } from "react";
import { userContext } from "../../context";
import { AiFillCloseCircle } from "react-icons/ai";
import { IMaskInput } from "react-imask";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.scss";
import { schemaContact } from "../../validators";

const ModalEdit = () => {
  const {
    isModalEdit,
    contacts,
    valueButton,
    setValueButton,
    setIsModalEdit,
    editModal,
    setInputEdit,
  } = useContext(userContext);
  const contact = contacts.find((contact) => contact.id === valueButton);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schemaContact),
  });

  return isModalEdit ? (
    <section className="modal-edit">
      <div className="div-edit">
        <div>
          <h2>Editar contato</h2>
          <button>
            <AiFillCloseCircle onClick={() => setIsModalEdit(false)} />
          </button>
        </div>
        <form onSubmit={handleSubmit(editModal)}>
          <input
            type="text"
            placeholder="Name"
            defaultValue={contact?.name}
            {...register("name")}
          />
          <input
            type="text"
            placeholder="Email"
            defaultValue={contact?.email}
            {...register("email")}
          />
          <IMaskInput
            placeholder="DDD + Telefone"
            mask="(00) 0 0000-0000"
            defaultValue={contact?.telephone}
            onAccept={(value) => {
                
              setInputEdit(value);
            }}
          />
          <button className="button-salvar" type="submit">
            Salvar alterações
          </button>
        </form>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default ModalEdit;
