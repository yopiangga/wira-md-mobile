import { useNavigate, useParams } from "react-router-dom";
import { NavbarComponent } from "src/components/navbar";
import {
  FiArrowLeft,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
} from "react-icons/fi";
import { MedicalRecordServices } from "src/services/MedicalRecordServices";
import { useEffect, useRef, useState } from "react";
import { InputSelect } from "src/components/input/input-select";
import { InputTextarea } from "src/components/input/input-textarea";
import { ButtonComponent, ButtonOutlineComponent } from "src/components/button";
import normalImage from "src/assets/images/normal.jpg";
import toast from "react-hot-toast";
import { MapComponent } from "./component/map";

export function PatientDetailMedicalRecord() {
  const navigate = useNavigate();
  const { id } = useParams();
  const medicalRecordServices = new MedicalRecordServices();

  const [editToggle, setEditToggle] = useState(false);

  const [formData, setFormData] = useState({});

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const [slides, setSlides] = useState([]);

  const handleNext = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const handlePrev = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 0);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const slideWidth = slideRef.current.offsetWidth / slides.length;
      slideRef.current.style.transform = `translateX(-${
        currentSlide * slideWidth
      }px)`;
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [currentSlide, slides]);

  const fetchData = async () => {
    const res = await medicalRecordServices.getMedicalRecordById({ id });
    if (res) {
      const idDicom = res.data.image.split("/").pop().split(".")[0];

      setFormData({
        ...res.data,
        idDicom,
      });

      setSlides([
        <img src={res.data.image} className="w-full h-full" />,
        <img src={res.data.segmented} className="w-full h-full" />,
      ]);
    }
  };

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let tempDiagnosisDoctor = formData.diagnosisDoctor;

    if (tempDiagnosisDoctor == null) {
      tempDiagnosisDoctor = "hemorrhagic";
    }

    const res = await medicalRecordServices.diagnosisByDoctor({
      id,
      diagnosisDoctor: tempDiagnosisDoctor,
      description: formData.description,
    });

    if (res) {
      toast.success("Success update diagnosis");
      setEditToggle(false);
      fetchData();
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center relative">
      {editToggle && (
        <div className="fixed z-10 w-full h-full bg-black bg-opacity-40 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg w-11/12 p-5"
          >
            <h4 className="f-h4 text-center">Diagnosis by Doctor</h4>
            <div className="w-full mt-2">
              <InputSelect
                color="dark"
                label={"Type Stroke"}
                name="diagnosisDoctor"
                value={formData.diagnosisDoctor}
                handleChange={handleChange}
                placeholder="Select Type Stroke"
                options={[
                  { label: "Hemorrhagic", value: "hemorrhagic" },
                  { label: "Ischemic", value: "ischemic" },
                  { label: "Not Stroke", value: "normal" },
                ]}
              />
            </div>
            <div className="w-full mt-2">
              <InputTextarea
                color="dark"
                label={"Description"}
                name={"description"}
                value={formData.description}
                handleChange={handleChange}
              />
            </div>
            <div className="flex flex-row justify-center gap-4 mt-4">
              <ButtonOutlineComponent
                title="Cancel"
                type="button"
                action={() => {
                  setEditToggle(false);
                }}
              />
              <ButtonComponent title="Submit" type="submit" />
            </div>
          </form>
        </div>
      )}

      <div className="w-full">
        <NavbarComponent
          title="Result CT Scan"
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

      <div className="carousel relative w-full">
        <div className="relative w-full h-96 overflow-hidden">
          <div
            ref={slideRef}
            className="carousel-inner flex transition duration-500 ease-in-out absolute"
          >
            {slides.map((slide, index) => (
              <div key={index} className="slide w-96">
                {slide}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="absolute top-0 start-0 z-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handlePrev}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <FiChevronLeft />
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handleNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <FiChevronRight />
          </span>
        </button>
      </div>

      <div className="mt-4 w-11/12">
        {formData.diagnosisDoctor == null ? (
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-black f-p1-r font-bold mb-2 uppercase">
                {formData.diagnosisAI}
              </h4>
              <p className="text-slate-400 f-p2-r">AI Prediction</p>
            </div>
          </div>
        ) : null}
        <div className="flex justify-between items-center mt-4">
          <div>
            <h4 className="text-black f-p1-r font-bold mb-2 uppercase">
              {formData.diagnosisDoctor}
            </h4>
            <p className="text-slate-400 f-p2-r">Diagnosis by Doctor</p>
          </div>
          <div>
            <button
              onClick={() => {
                setEditToggle(true);
              }}
              className="py-2 px-5 bg-white border border-primary-main rounded-full f-p2-r text-primary-main"
            >
              Diagnose
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-b border-slate-200 flex justify-between py-6 w-11/12 items-center">
        <h4 className="f-p1-r">
          <a
            href={formData.image}
            download={
              formData.nikPatient +
              "_" +
              formData.patient +
              "_" +
              formData.id +
              ".jpg"
            }
            className="text-primary-main"
          >
            Download
          </a>{" "}
          image CT Scan result
        </h4>
        <button
          className="py-2 px-5 bg-white border border-primary-main rounded-full f-p2-r text-primary-main"
          onClick={() => {
            navigate("/medical-record/dicom/" + formData.idDicom);
          }}
        >
          View DICOM
        </button>
      </div>

      <div className="mt-4 w-11/12 flex flex-col gap-4">
        <ListLabel label="ID Record" value={formData?.id} />
        <ListLabel label="Doctor" value={formData?.doctor} />
        <ListLabel label="Hospital" value={formData?.hospital} />
        <ListLabel label="ID Patient" value={formData?.idPatient} />
        {/* <ListLabel label="NIK" value={formData?.nikPatient} /> */}
        <ListLabel label="Patient" value={formData?.patient} />
        <ListLabel
          label="Time"
          value={new Date(formData.createdAt).toLocaleDateString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        />
        <ListLabel label="Note" value={formData.description} />
      </div>

      <div className="mt-6 w-11/12">
        <MapComponent idPatient={formData.idPatient} />
      </div>

      <div className="mt-6 w-11/12">
        <button
          onClick={() => {
            navigate("/medical-record/patient/" + formData.idPatient);
          }}
          className="py-3 px-5 bg-primary-main border border-primary-main rounded-full f-p1-m text-white w-full"
        >
          Detail Patient
        </button>
      </div>

      <br />
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
