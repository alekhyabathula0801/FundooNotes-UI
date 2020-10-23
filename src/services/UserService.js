import HttpServices from "./HttpServices";
let baseUrl = process.env.REACT_APP_API_URL;

class UserService {
  userLogin(data) {
    return HttpServices.postApiRequest(data, `${baseUrl}api/user/login`);
  }
}

export default new UserService();
