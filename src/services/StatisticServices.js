import axios from "axios";
import { baseUrl } from "src/config/Url";
import { handleAxiosError, handleOtherStatusCodes } from "./errors";
import { headers } from "./config";

export class StatisticServices {
    async getStatistic({idHospital}) {
        try {
        const res = await axios.get(`${baseUrl}/statistics/by-doctor/${idHospital}`, { headers });
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

