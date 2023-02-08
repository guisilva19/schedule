import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context";
import { AiFillFilePdf } from "react-icons/ai";

import Card from "../../components/cards/Card";
import ModalCreateContact from "../../components/modalCreateContact/CreateContact";
import ModalEdit from "../../components/modalEdit/ModalEdit";
import ModalRemove from "../../components/modalRemove/modalRemove";
import pdfContact from "../../reports/pdfContact";

import "./style.scss";

const Dashboard = () => {
  const { user, openModal, loading, contacts } = useContext(userContext);

  const navigate = useNavigate();

  const sair = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  if (!user) {
    navigate("/login", { replace: true });
  }

  if (loading) return <p>carregando...</p>;

  return user ? (
    <>
      <header>
        <h2>{user.name}</h2>
        <nav>
          <ul>
            <li onClick={() => pdfContact(contacts)}>
              <AiFillFilePdf /> PDF
            </li>
            <li onClick={() => openModal()}>Contato</li>
            <li onClick={() => sair()}>Sair</li>
          </ul>
        </nav>
      </header>
      <section className="section-contacts">
        <h2>Contacts</h2>
        <div className="div-card">
          {contacts?.map((contact) => (
            <Card contact={contact} key={contact.id} />
          ))}
        </div>
      </section>
      <ModalCreateContact />
      <ModalRemove />
      <ModalEdit />
    </>
  ) : (
    <p>carregando...</p>
  );
};

export default Dashboard;
