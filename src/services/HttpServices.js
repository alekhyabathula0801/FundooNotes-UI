import axios from "axios";

class HttpServices {
  postApiRequest = (data, url) => {
    return axios.post(url, data);
  };
}

export default new HttpServices();
