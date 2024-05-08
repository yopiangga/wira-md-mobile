import { FiHome, FiShoppingCart, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function BottomNavbarComponent(props) {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const isHome = path == "/";
  const isProfile = path == "/medical-record";

  return (
    <div className="w-full max-w-screen-sm shadow-s1 flex justify-around p-1 mx-auto relative">
      <MenuCard
        icon={FiHome}
        title="Dashboard"
        active={isHome}
        handleClick={() => {
          navigate("/");
        }}
      />
      <MenuCard
        icon={FiUsers}
        title="Medical Records"
        active={isProfile}
        handleClick={() => {
          navigate("/medical-record");
        }}
      />
    </div>
  );
}

function MenuCard(props) {
  return (
    <button
      onClick={props.handleClick}
      className={`flex flex-col items-center justify-center rounded-lg p-2 w-full relative z-20 bg-white ${
        props.active ? "text-primary-main" : "text-slate-500"
      }`}
    >
      <props.icon size={24} />
      <p className="text-xs mt-0.5">{props.title}</p>
    </button>
  );
}
