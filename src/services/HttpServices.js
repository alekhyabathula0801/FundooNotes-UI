import axios from "axios";
class HttpServices {
  postApiRequest = (data, url, token) => {
    return axios.post(url, data, {
      headers: { Authorization: token },
    });
  };
}

export default new HttpServices();
