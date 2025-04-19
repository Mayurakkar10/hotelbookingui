import axios from "axios";

const baseUrl = "http://localhost:8080";

class UserService {
  userRegister(data) {
    return axios.post(`${baseUrl}/addUsers`, data);
  }

  userLogin(data) {
    return axios.post(`${baseUrl}/loginUser`, data);
  }
}

const userService = new UserService();
export default userService;
