import axios from "axios";
import { useManagerStore } from "../src/stores/manager";

axios.defaults.withCredentials = true;
const API_URL = "http://localhost:3000/api/User/";

class User {
  static async fetchUsers() {
    const response = await axios.get(API_URL);
    return response.data;
  }

  static async addUser(User) {
    await axios.post(API_URL, User);
    await this.fetchUsers();
  }

  static async updateUser(User) {
    await axios.put(API_URL, User);
    await this.fetchUsers();
  }

  static async removeUser(data) {
    const managerStore = useManagerStore()
    try {
      const response = await axios.delete(API_URL, {data: data});
    if (response.status) {
      await this.fetchUsers();
      return true
    }
    return false
    } catch (error) {
      managerStore.showError(error.response, "user api removeuser")
    }
  }

  static async getSpecificUser(User) {
    const response = await axios.get(API_URL + User);
    this.Users = this.Users.map((User) =>
      User._id === User ? response.data : User
    );
  }
}

export default User;
