import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../service";
export const userContext = createContext();

export const Provider = ({ children }) => {
  const [user, setUser] = useState();
  const [contacts, setContacts] = useState();
  const navigate = useNavigate();
  const [input, setInput] = useState();
  const [inputRegister, setInputRegister] = useState();
  const [inputEdit, setInputEdit] = useState();
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalRemove, setIsModalRemove] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [valueButton, setValueButton] = useState();
  const token = localStorage.getItem("token");

  const login = (data) => {
    Api.post("/session", data)
      .then((response) => {
        const token = response.data;
        localStorage.setItem("token", token);
        toast.success("Login feito com sucesso!", { autoClose: 2000 });

        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        Api.get("/user").then((response) => setUser(response.data));
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        toast.error("Email ou senha errado", { autoClose: 2000 });
      });
  };

  const registerUser = (data) => {
    if (inputRegister.length < 16) {
      return toast.error("Telephone invalid");
    }
    const body = { ...data, telephone: inputRegister };

    Api.post("/register", body)
      .then((response) => {
        toast.success("Registro feito", { autoClose: 2000 });
        navigate("/login", data);
      })
      .catch((err) => {
        toast.error("Error nas credenciais", { autoClose: 2000 });
      });
  };

  const contactCreate = (data) => {
    if (input.length < 16) {
      return toast.error("Telephone invalid");
    }
    const body = { ...data, telephone: input };

    Api.post("/contact", body)
      .then(async (response) => {
        toast.success("Contato adicionado");

        await Api.get("/contact").then(({ data }) => setContacts(data));
        setIsModalCreate(false);
      })
      .catch((err) => {
        toast.error("Contato ja existe");
      });
  };

  const removeContact = () => {
    Api.delete(`/contact/${valueButton}`).then((response) => {
      const restContact = contacts.filter(
        (contact) => contact.id !== valueButton
      );
      setContacts(restContact);
      toast.success("Contato excluido!");
      setIsModalRemove(false);
    });
  };

  const editModal = async (data) => {
    if (inputEdit.length < 16) {
      return toast.error("Telephone invalid");
    }
    const body = { ...data, telephone: inputEdit };

    const contact = contacts.find((contact) => contact.email === body.email || contact.telephone === body.telephone)

    if(contact) {
      return toast.error('Email ou telefone ja cadastrado')
    }
    Api.patch(`/contact/${valueButton}`, body)
      .then(async (response) => {
        const { data } = await Api.get("/contact");
        setContacts(data);
        setIsModalEdit(false);
        toast.success("Editado");
      })
      .catch((err) => {
        toast.error("Nenhuma alteração ou contato já existente!");
        setIsModalEdit(false);
      });
  };

  useEffect(() => {
    async function loadUser() {
      if (token) {
        try {
          Api.defaults.headers.common.Authorization = `Bearer ${token}`;
          const { data } = await Api.get(`/user`);
          setUser(data);
          await Api.get("/contact").then((response) => {
            setContacts(response.data);
          });
          navigate("/dashboard", { replace: true });
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const openModal = () => {
    if (isModalCreate) {
      setIsModalCreate(false);
    }

    if (!isModalCreate) {
      setIsModalCreate(true);
    }
  };
  return (
    <userContext.Provider
      value={{
        user,
        isModalCreate,
        isModalRemove,
        contacts,
        loading,
        isModalEdit,
        valueButton,
        login,
        registerUser,
        contactCreate,
        removeContact,
        openModal,
        editModal,
        setInput,
        setIsModalRemove,
        setValueButton,
        setInputRegister,
        setIsModalEdit,
        setInputEdit,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
