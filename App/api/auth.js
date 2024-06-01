// auth.js
import axios from "axios";
import { useBoardsStore } from "../src/stores/boards";
import { useMailsStore } from "../src/stores/mails";
import { useAuthStore } from "../src/stores/AuthStore"
import { useManagerStore } from "../src/stores/manager";
const API_URL = "http://localhost:3000/api/auth/";
import io from "socket.io-client";

class Auth {
  static socket = null;

  static initiateSocketConnection() {
    return new Promise((resolve, reject) => {
      if (this.socket && this.socket.connected) {
        resolve(this.socket);
        return;
      }
      if (this.socket) {
        if (this.socket.connected) {
          resolve(this.socket);
          return;
        } else {
          this.socket.connect();
        }
      } else {
        if (!this.socket || !this.socket.connected) {
          this.socket = io("http://localhost:3000", {
            withCredentials: true,
          });

          this.socket.on("connect", () => {
            const mailStore = useMailsStore();
            
            const authStore = useAuthStore();
            const boardsStore = useBoardsStore();
            authStore.socketId = this.socket.id
            this.socket.on("updateBoard", () => {
              boardsStore.getData();
            });
            this.socket.on("updateMail", () => {
              mailStore.getData();
            });
            resolve(this.socket);
          });

          this.socket.on("connect_error", (err) => {
            console.log(err);
          });
        }
      }
    });
  }

  static async register(data) {
    const response = await axios.post(API_URL + "register", data);
    return response.data;
  }
  
  static async login(username, password) {
    const managerStore = useManagerStore()
    try {
      const response = await axios.post(API_URL + "login", {
        username,
        password,
      });
      if (response.status) {
        const data = response.data;
        await this.initiateSocketConnection();
        return true;
      }
      return false
    } catch (error) {
      managerStore.showError(error.response, 'auth Login')
    }
  }

  static async logout() {
    const managerStore = useManagerStore()
    try {
      const response = await axios.get(API_URL + "logout", {
        withCredentials: true,
      });
      const data = response.data;
      if (this.socket) {
        this.socket.disconnect();
      }
      const authStore = useAuthStore();
      authStore.$reset(); // Сброс store к начальному состоянию
      if (response.status) {
        return true;
      }
      return false
    } catch (error) {
      managerStore.showError(error.response, 'auth LogOut')
      return null
    }
  }

  static async checkToken() {
    try {
      const response = await axios.get(API_URL + "checkToken", {
        withCredentials: true,
      });
      if (response.data.valid) {
        await this.initiateSocketConnection();
      }
      return response.data;
    } catch (error) {
      return false;
    }
  }
}

export default Auth;
