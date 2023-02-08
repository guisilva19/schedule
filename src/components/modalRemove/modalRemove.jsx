import { useContext } from "react";
import { userContext } from "../../context";
import "./style.scss";

const ModalRemove = () => {
  const { isModalRemove, setIsModalRemove, removeContact } = useContext(userContext);

  return isModalRemove ? (
    <section className="fundo-modal">
      <div className="modal-remove">
        <h2>Deseja excluir esse contato?</h2>
        <div>
          <button onClick={() => removeContact()}>Sim</button>
          <button onClick={() => setIsModalRemove(false)}>Não</button>
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default ModalRemove;
