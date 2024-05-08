import axios from "axios";
import { baseUrl } from "src/config/Url";
import { handleAxiosError, handleOtherStatusCodes } from "./errors";
import { headers, headersFormData } from "./config";

export class MedicalRecordServices {
  async getMedicalRecords() {
    try {
      const res = await axios.get(`${baseUrl}/medical-records`, { headers });
      if (res.status === 200) {
        return res.data;
      } else {
        handleOtherStatusCodes(res.status);
        return false;
      }
    } catch (err) {
      handleAxiosError(err);
      return false;
    }
  }

  async getMedicalRecordById({ id }) {
    try {
      const res = await axios.get(`${baseUrl}/medical-records/${id}`, {
        headers,
      });
      if (res.status === 200) {
        return res.data;
      } else {
        handleOtherStatusCodes(res.status);
        return false;
      }
    } catch (err) {
      handleAxiosError(err);
      return false;
    }
  }

  async getMedicalRecordsByPatientId({ id }) {
    try {
      const res = await axios.get(`${baseUrl}/medical-records/patient/${id}`, {
        headers,
      });
      if (res.status === 200) {
        return res.data;
      } else {
        handleOtherStatusCodes(res.status);
        return false;
      }
    } catch (err) {
      handleAxiosError(err);
      return false;
    }
  }

  async updateMedicalRecord({ id, data }) {
    try {
      const res = await axios.put(`${baseUrl}/medical-records/${id}`, data, {
        headers: headersFormData,
      });
      if (res.status === 200) {
        return res.data;
      } else {
        handleOtherStatusCodes(res.status);
        return false;
      }
    } catch (err) {
      handleAxiosError(err);
      return false;
    }
  }

  async diagnosisByDoctor({ id, diagnosisDoctor, description }) {
    try {
      const res = await axios.put(
        `${baseUrl}/medical-records/diagnosis-by-doctor`,
        {
          id,
          diagnosisDoctor: diagnosisDoctor,
          description,  
        },
        { headers }
      );
      if (res.status === 200) {
        return res.data;
      } else {
        handleOtherStatusCodes(res.status);
        return false;
      }
    } catch (err) {
      handleAxiosError(err);
      return false;
    }
  }
}
