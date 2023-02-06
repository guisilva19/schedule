import "./global/globalStyle.scss";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <>
      <ToastContainer />
        <AppRoutes />
    </>
  );
}

export default App;
