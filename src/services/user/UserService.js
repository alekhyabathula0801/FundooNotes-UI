import {ApiCall} from "../api/ApiCall";
let baseUrl = process.env.REACT_APP_API_URL;
class UserService {
  userLogin(data) {
    return ApiCall(data, baseUrl, "POST");
  }
}

export default new UserService();
