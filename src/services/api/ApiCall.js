import axios from "axios";

class ApiCall {
  postApiRequest = (data, url) => {
    return axios.post(url, data);
  };
}

export default new ApiCall();
