import "./style.scss";
import { BsTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useContext } from "react";
import { userContext } from "../../context/index";

const Card = ({ contact }) => {
  const {
    setIsModalRemove,
    setValueButton,
    setIsModalEdit,
    setInputEdit,
    contacts,
  } = useContext(userContext);

  return (
    <li className="li-card">
      <div className="div-info-card">
        <h3 className="h3-card">
          Name: <p>{contact.name}</p>
        </h3>
        <span className="span-email">
          Email: <p>{contact.email}</p>
        </span>
        <span className="span-telephone">
          Telephone: <p>{contact.telephone}</p>
        </span>
      </div>
      <div className="div-remove-card">
        <button
          id={contact.id}
          className="button-edit"
          onClick={(event) => {
            let id = event.target.closest("button").id;
            const contact = contacts.find((contact) => contact.id === id);
            setInputEdit(contact.telephone);
            setIsModalEdit(true);
            setValueButton(event.target.closest("button").id);
          }}
        >
          <FaEdit />
        </button>
        <button
          id={contact.id}
          onClick={(event) => {
            let id = event.target.closest("button").id;
            setIsModalRemove(true);
            setValueButton(id);
          }}
        >
          <BsTrashFill />
        </button>
      </div>
    </li>
  );
};

export default Card;
