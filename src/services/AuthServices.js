import { baseUrl } from "src/config/Url";
import { handleAxiosError, handleOtherStatusCodes } from "./errors";
import axios from "axios";
import { headers } from "./config";

export class AuthServices {
  async SignUp({ name, email, password }) {
    try {
      const res = await axios.post(`${baseUrl}/auth/register`, {
        name: name,
        email: email,
        password: password,
      });
      if (res.status === 200) {
        return res.data;
      } else {
        handleOtherStatusCodes(res.status);
        return false;
      }
    } catch (error) {
      handleAxiosError(error);
      return false;
    }
  }

  async SignIn({ email, password }) {
    try {
      const res = await axios.post(`${baseUrl}/auth/signin`, {
        email: email,
        password: password,
      });

      if (res.status === 200) {
        return res.data;
      } else {
        handleOtherStatusCodes(res.status);
        return false;
      }
    } catch (error) {
      handleAxiosError(error);
      return false;
    }
  }

  async SignOut() {
    try {
      const res = await axios.post(`${baseUrl}/auth/logout`, { headers });
      if (res.status === 200) {
        return res.data;
      } else {
        handleOtherStatusCodes(res.status);
        return false;
      }
    } catch (error) {
      handleAxiosError(error);
      return false;
    }
  }

  async ForgotPassword({ email }) {
    try {
      const res = await axios.post(`${baseUrl}/auth/forgot-password`, {
        email: email,
      });
      if (res.status === 200) {
        return res.data;
      } else {
        handleOtherStatusCodes(res.status);
        return false;
      }
    } catch (error) {
      handleAxiosError(error);
      return false;
    }
  }

  async ResetPassword({ email, token, password, password_confirmation }) {
    try {
      const res = await axios.post(`${baseUrl}/auth/reset-password`, {
        email: email,
        token: token,
        password: password,
        password_confirmation: password_confirmation,
      });
      if (res.status === 200) {
        return res.data;
      } else {
        handleOtherStatusCodes(res.status);
        return false;
      }
    } catch (error) {
      handleAxiosError(error);
      return false;
    }
  }
}
