import axios from "axios";
axios.defaults.withCredentials = true;
const API_URL = "http://localhost:3000/api/structure/";

class Structure {
  static async fetchDepartments() {
    return await axios.get(API_URL + "dep/");
  }

  static async fetchPosts() {
    return await axios.get(API_URL + "post/");
  }
}

export default Structure;
