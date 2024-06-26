import { FiArrowLeft, FiHome } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { NavbarComponent } from "src/components/navbar";
import { DicomComponent } from "./component/dicom";

export function DicomReaderPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center relative">
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

        <div className="">
          <DicomComponent idDicom={id} />
        </div>
      </div>
    </div>
  );
}
