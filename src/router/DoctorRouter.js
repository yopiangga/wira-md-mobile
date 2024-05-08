import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserLayout } from "src/layouts/user";
import { HomePage } from "src/pages/home";
import { MedicalRecordPage } from "src/pages/medical-record";
import { PatientDetailMedicalRecord } from "src/pages/patient-detail-medical-record";
import { PatientMedicalRecord } from "src/pages/patient-medical-record";
import { MyProfilePage } from "src/pages/profile";
import { EditProfilePage } from "src/pages/profile/edit";
import { StartPage } from "src/pages/start";

export default function DoctorRouterPage() {
  return (
    <UserLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/medical-record" element={<MedicalRecordPage />} />
          <Route
            path="/medical-record/patient/:id"
            element={<PatientMedicalRecord />}
          />
          <Route
            path="/medical-record/:id"
            element={<PatientDetailMedicalRecord />}
          />
          <Route path="/profile/me" element={<MyProfilePage />} />
          <Route path="/profile/me/edit" element={<EditProfilePage />} />

          <Route path="*" element={<HomePage />} exact />
        </Routes>
      </BrowserRouter>
    </UserLayout>
  );
}
