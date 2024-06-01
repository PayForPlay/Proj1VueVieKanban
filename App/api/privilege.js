import axios from "axios";
axios.defaults.withCredentials = true;
const API_URL = "http://localhost:3000/api/privilege/";

class Privilege {
  static async fetchPrivilege() {
    return await axios.get(API_URL);
  }
}

export default Privilege;
