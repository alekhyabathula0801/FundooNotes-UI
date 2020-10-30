import HttpServices from "./HttpServices";
import * as userApiConstants from "../apiConstants/userApiConstants";
let baseUrl = process.env.REACT_APP_API_URL;

class UserService {
  userLogin(data) {
    return HttpServices.postApiRequest(
      data,
      baseUrl + userApiConstants.userApi.logIn
    );
  }
}

export default new UserService();
