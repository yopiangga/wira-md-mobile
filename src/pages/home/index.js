import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imageUser from "src/assets/icons/avatar.png";
import iconUser from "src/assets/icons/user.png";
import { BottomNavbarComponent } from "src/components/navbar/BottomNavbarComponent";
import { UserContext } from "src/context/UserContext";
import { StatisticServices } from "src/services/StatisticServices";

export function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const statisticServices = new StatisticServices();

  const [data, setData] = useState({});

  useEffect(() => {
    setTimeout(() => {
      fetch();
    }, 0);
  }, []);

  async function fetch() {
    const res = await statisticServices.getStatistic({
      idHospital: user.idHospital,
    });

    setData(res.data);
  }

  return (
    <div className="min-h-screen">
      <div className="mt-6 px-4 flex flex-row items-center justify-between">
        <div className="">
          <h3 className="f-h3 text-black font-bold line-clamp-1">
            Welcome, {user.name ?? "User"}
          </h3>
          <p className="f-p1-r text-black">
            {new Date().toLocaleString("en-us", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="">
          <button
            onClick={() => {
              navigate("/profile/me");
            }}
          >
            <img
              src={user.image ?? imageUser}
              className="w-10 h-10 rounded-full"
            />
          </button>
        </div>
      </div>

      <div className="w-full mt-5 flex justify-center">
        <div className="w-11/12 overflow-scroll flex gap-1">
          <BadgeComponent title="Overview" status={true} />
          <BadgeComponent title="Daily" status={false} />
          <BadgeComponent title="Weekly" status={false} />
          <BadgeComponent title="Monthly" status={false} />
        </div>
      </div>

      <div className="mt-5 px-4">
        <div className="p-4 bg-primary-main text-white rounded-2xl">
          <h4 className="text-lg font-bold">
            Statistical classification of stroke patients
          </h4>
          <h4 className="text-sm text-center mt-1">
            Total Patients (Diagnosed)
          </h4>
          <h4 className="text-3xl font-bold text-center mt-2">
            {data.totalDiagnosed}
          </h4>

          {data.totalDiagnosed > 0 ? (
            <div className="w-full flex flex-row mt-4 justify-center">
              <ChartComponent
                title="Normal"
                color="#6B4EFF"
                percent={(data.totalNormal / data.totalDiagnosed) * 100}
              />
              <ChartComponent
                title="Ischemic"
                color="#FFB323"
                percent={(data.totalIschemic / data.totalDiagnosed) * 100}
              />
              <ChartComponent
                title="Hemorrhagic"
                color="#C5341B"
                percent={(data.totalHemorrhagic / data.totalDiagnosed) * 100}
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-5 px-4 grid grid-cols-2 gap-3">
        <CardComponent
          title={"Total Patients"}
          subTitle={""}
          value={data.totalPatient}
        />
        <CardComponent
          title={"Normal Patients"}
          subTitle={""}
          value={data.totalNormal}
        />
        <CardComponent
          title={"Ischemic Patients"}
          subTitle={""}
          value={data.totalIschemic}
        />
        <CardComponent
          title={"Hemorrhagic Patients"}
          subTitle={""}
          value={data.totalHemorrhagic}
        />
        <CardComponent
          title={"Classified"}
          subTitle={""}
          value={data.totalDiagnosed}
        />
        <CardComponent
          title={"Un-Classified"}
          subTitle={""}
          value={data.totalUnDiagnosed}
        />
      </div>

      <br />
      <br />
      <br />

      <div className="fixed bottom-0 left-0 right-0">
        <BottomNavbarComponent />
      </div>
    </div>
  );
}

const CardComponent = ({ id, title, subTitle, value }) => {
  return (
    <div className={`bg-white p-4 rounded-lg flex-1 shadow-s1`}>
      <h4 className="text-black font-bold text-sm">{title}</h4>
      <h5 className="text-black text-xs">{subTitle}</h5>
      <div className="flex flex-row items-center mt-2">
        <img src={iconUser} />
        <h4 className="text-black text-lg font-bold text-center ml-2">
          {value}
        </h4>
      </div>
    </div>
  );
};

const BadgeComponent = ({ title, status, callback }) => {
  return (
    <button>
      <div
        className={`${
          status ? "bg-primary-main" : "bg-white"
        } rounded-full px-5 py-2`}
      >
        <h4
          className={`text-center f-p1-r ${
            status ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h4>
      </div>
    </button>
  );
};

const ChartComponent = ({ title, color, percent }) => {
  return (
    <div className="overflow-hidden" style={{ width: `${percent}%` }}>
      <h4 className="text-center font-bold text-lg" style={{ color: color }}>
        {percent}%
      </h4>
      <div className="w-full py-2 mt-1" style={{ backgroundColor: color }}>
        <h4 className="text-white text-center text-xs">{title}</h4>
      </div>
    </div>
  );
};
