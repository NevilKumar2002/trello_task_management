import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8000/api/";

class AuthService {
  getUsers() {
    return axios.get(API_URL + "users").then((response) => {
      return response.data;
    });
  }

  login(email, password) {
    return axios
      .post(API_URL + "login", { email, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Wrong Credentials!☹️");
        throw error;
      });
  }

  logout() {
    localStorage.removeItem("user");
    return axios.get(API_URL + "logout");
  }

  async isLoggedIn() {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const res = await axios.get(API_URL + "validate", { headers: authHeader() });
    
    if (parsedUser && parsedUser.token && res.data.isAuth) {
      console.log("Successfully logged in");
      return true;
    } else {
      console.error("Something went wrong");
      return false;
    }
  }

  register(name, email, password) {
    return axios
      .post(API_URL + "register", { name, email, password })
      .then((response) => {
        console.log("Registration successful:", response);
        return response.data;
      })
      .catch((error) => {
        console.error("Registration error:", error);
        throw error;
      });
  }
}

export default new AuthService();
