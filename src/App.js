import { useContext, useEffect, useState } from "react";
import "./App.css";
import { UserContext } from "./context/UserContext";
import AuthRouterPage from "./router/AuthRouter";
import DoctorRouterPage from "./router/DoctorRouter";
import { AppContextProvider } from "./context/AppContextProvider";
import { cookies } from "./services/config";
import LoadComponent from "./components/load";
import { UserServices } from "./services/UserServices";

function App() {
  return (
    <AppContextProvider>
      <UserManager />
    </AppContextProvider>
  );
}

export default App;

function UserManager() {
  const userServices = new UserServices();

  const { user, setUser } = useContext(UserContext);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    const token = cookies?.token ?? "";

    if (token === "" || token === undefined) {
      setUser(null);
    } else {
      const res = await userServices.myProfile();
      if (res) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    }
    setLoad(false);
  }

  if (load) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white">
        <LoadComponent />
      </div>
    );
  } else if (user == null && load == false) {
    return <AuthRouterPage />;
  } else if (user.role == "doctor") {
    return <DoctorRouterPage />;
  } else {
    return <AuthRouterPage />;
  }
}
