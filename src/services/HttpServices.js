import axios from "axios";
class HttpServices {
  postApiRequest = (data, url, token) => {
    return axios.post(url, data, {
      headers: { Authorization: token },
    });
  };

  getApiRequest = (url, token) => {
    return axios.get(url, {
      headers: { Authorization: token },
    });
  };

  deleteApiRequest = (url, token) => {
    return axios.delete(url, {
      headers: { Authorization: token },
    });
  };
}

export default new HttpServices();
