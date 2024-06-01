// store/AuthStore.js
import { defineStore } from "pinia";
import Auth from "../../api/auth";
import { Init } from "../utils/init";
import { handleKeyDown } from "../utils/handleKeydown";
import { useManagerStore } from "./manager";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    userId: "",
    isAdmin: false,
    socketId: '',
  }),

  actions: {
    async checkLoginState() {
      try {
        let response = await Auth.checkToken();
        this.isAdmin = response.isAdmin;
        this.isLoggedIn = response.valid;
        this.userId = response.userId;
        return true;
      } catch (error) {
        console.log("Ошибка проверки токена", error);
        return false;
      }
    },

    async login(username, password) {
      const managerStore = useManagerStore()
      
      try {
        
        const response = await Auth.login(username, password);
        if (response === true) {
          this.isLoggedIn = true;
          await Init();
          window.addEventListener("keydown", handleKeyDown);
        }
        return true
      } catch (error) {
        managerStore.showError(error.response, 'authStore Login')
      }
    },

    async logout() {
      try {
        this.isLoggedIn = false;
        this.userId = "";
        window.removeEventListener("keydown", handleKeyDown);
        let response = await Auth.logout();
        if (response) {
          return true
        }
        return false
      } catch (error) {
        managerStore.showError(error.response, 'authStore Logout')
      }
    }
  },
});
export default useAuthStore;
