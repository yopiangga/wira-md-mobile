import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiHome,
  FiShoppingBag,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import LoadComponent from "src/components/load";
import { NavbarComponent } from "src/components/navbar";
import { BottomNavbarComponent } from "src/components/navbar/BottomNavbarComponent";
import { AuthServices } from "src/services/AuthServices";
import { UserServices } from "src/services/UserServices";
import avatar from "src/assets/images/user.png";

export function MyProfilePage() {
  const navigate = useNavigate();

  const userServices = new UserServices();
  const authServices = new AuthServices();

  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetchUser();
    }, 0);
  }, []);

  async function fetchUser() {
    const response = await userServices.myProfile();
    if (!response) return;

    setUser(response.data);
  }

  if (user == null) {
    return <LoadComponent />;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <NavbarComponent
          title="My Profile"
          type="dark"
          leftIcon={FiArrowLeft}
          handleLeft={() => {
            navigate(-1);
          }}
          rightIcon={FiHome}
          handleRight={() => {
            navigate("/");
          }}
        />
      </div>

      <div className="w-11/12 mt-4">
        <div className="bg-white shadow-s1 w-full rounded-lg flex p-5 gap-4">
          <div className="w-20 h-20 rounded-full relative overflow-hidden flex justify-center items-center">
            <img
              src={user.image ? user.image : avatar}
              className="w-full h-auto absolute"
            />
          </div>
          <div className="grow flex flex-col justify-center">
            <h4 className="font-semibold f-h4 line-clamp-2">{user.name}</h4>
            <p className="font-semibold f-p2-r">{user.email}</p>

            <button
              onClick={() => {
                navigate("/profile/me/edit");
              }}
              className="f-p2-r bg-primary-main mt-3 py-1 px-4 w-fit rounded-full text-white"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="w-11/12 mt-4">
        <div className="bg-white shadow-s1 w-full rounded-lg flex justify-between p-5 gap-4">
          <h5 className="f-h5">Hospital</h5>
          <h5 className="f-h5 text-primary-main">{user.hospital.name}</h5>
        </div>
      </div>

      <div className="w-11/12 mt-6">
        <h5 className="f-h5">General Settings </h5>

        <div className="mt-4 flex flex-col gap-2">
          <CardButton title="FAQ" handleClick={() => {}} />
          <CardButton
            title="Help Center"
            handleClick={() => {
              window.open(
                "https://wa.me/6282330410865?text=Halo%20Admin%20Saya%20Mau%20Tanya%20Nih",
                "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"
              );
            }}
          />
          <CardButton
            title="Feedback"
            handleClick={() => {
              navigate("/my-profile/feedback");
            }}
          />
          <CardButton
            title="Sign Out"
            handleClick={async () => {
              await authServices.SignOut();
              document.cookie = "token=; Max-Age=0";
              window.location.href = "/";
            }}
          />
        </div>
      </div>

      <br />
      <br />
      <br />
      <div className="w-full fixed bottom-0">
        <BottomNavbarComponent />
      </div>
    </div>
  );
}

function CardButton({ ...props }) {
  return (
    <div className="bg-white shadow-s1 w-full rounded-lg flex justify-between p-5 gap-4">
      <p className="f-p2-r">{props.title}</p>
      <button onClick={props.handleClick}>
        <FiArrowRight />
      </button>
    </div>
  );
}
