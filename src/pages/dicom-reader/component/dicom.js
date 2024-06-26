import { useEffect } from "react";
import scriptjs from "scriptjs";

export function DicomComponent({ idDicom }) {
  useEffect(() => {
    const loadScript = () => {
      scriptjs(
        "https://kitware.github.io/itk-vtk-viewer/app/itkVtkViewerCDN.js",
        (err) => {
          if (err) {
            console.error("Error loading ITK-VTK Viewer script:", err);
          } else {
            console.log("ITK-VTK Viewer script loaded!");
          }
        }
      );
    };

    // Load the script only once on component mount
    loadScript();
  }, []);

  return (
    <div className="overflow-hidden w-full h-[90vh]">
      <div
        className="itk-vtk-viewer"
        data-url={
          "https://wira-api.alfian-py.site/uploads/medical-record/dcm/" +
          idDicom
        }
        data-viewport="100%x100%"
      ></div>
    </div>
  );
}
