import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/cards/Card";
import { userContext } from "../../context";
import Api from "../../service/index";
import "./style.scss";

const Dashboard = () => {
  const { user, setUser } = useContext(userContext);
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState()


  const sair = () => {
    localStorage.removeItem("token");
    nav("/login", { replace: true });
  };

  useEffect(() => {
    async function loadUser() {
      if (token) {
        try {
          Api.defaults.headers.common.Authorization = `Bearer ${token}`;
          const { data } = await Api.get(`/user`);
          setUser(data);
          nav("/dashboard", { replace: true });

          Api.get('/contact')
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  if (!user) {
    nav("/login", { replace: true });
  }

  if (loading) return <p>carregando...</p>;

  return user ? (
    <div className="div-dashboard">
      <header>
        <h2>{user.name}</h2>
        <button onClick={() => sair()}>Sair</button>
      </header>
      <section>
        <Card />
      </section>
    </div>
  ) : (
    <p>carregando...</p>
  );
};

export default Dashboard;
