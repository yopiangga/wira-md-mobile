import { NavbarComponent } from "src/components/navbar";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MedicalRecordServices } from "src/services/MedicalRecordServices";
import LoadComponent from "src/components/load";

export function PatientMedicalRecord() {
  const navigate = useNavigate();
  const { id } = useParams();

  const medicalRecordServices = new MedicalRecordServices();

  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 0);
  }, []);

  const fetchData = async () => {
    const res = await medicalRecordServices.getMedicalRecordsByPatientId({
      id,
    });
    if (res) {
      setData(res.data);
    }
  };

  if (!data) {
    return <LoadComponent />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full">
        <NavbarComponent
          title={data[0]?.patient}
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

      <div className="w-11/12 mt-4 flex flex-col gap-4">
        {data &&
          data.map((item) => (
            <MedicalRecordComponent
              data={item}
              callback={(e) => {
                navigate(`/medical-record/${id}`);
              }}
            />
          ))}
      </div>

      <br />
      <br />
      <br />
    </div>
  );
}

function MedicalRecordComponent({ data, callback }) {
  return (
    <div className="w-full shadow-s4 rounded-2xl overflow-hidden">
      <div className="">
        {/* <img src={normalImage} className="w-full" /> */}
        <img src={data.image} className="w-full" />
      </div>
      <div className="p-4">
        <p className="f-p1-r text-primary-main">
          {
            // tanggal
            new Date(data.createdAt).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }
        </p>
        <h3 className="f-h3 mt-2 uppercase">
          {data.diagnosisDoctor == "" ? "Un-Classified" : data.diagnosisDoctor}
        </h3>
        <p className="mt-2 f-p2-r">{data.description ?? "-"}</p>

        <div className="mt-4 w-full flex flex-col gap-2">
          <ListLabel label="ID Record" value={data.id} />
          <ListLabel label="Doctor" value={data.doctor} />
          <ListLabel label="AI Pred." value={data.diagnosisAI} />
        </div>
      </div>
    </div>
  );
}

function ListLabel({ label, value }) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <h4 className="f-p1-r">{label}</h4>
      </div>
      <div className="col-span-9">
        <p className="f-p1-r text-right">{value ?? "-"}</p>
      </div>
    </div>
  );
}
