import { defineStore } from "pinia";
import Auth from '../../api/auth';
export const useManagerStore = defineStore({
  id: "manager",
  state: () => ({
    taskView: false,
    taskForm: {
      visible: false,
      edit: false,
    },
    boardForm: {
      visible: false,
      edit: false,
    },
    mailForm: false,
    mailView: false,
    eventForm: false,
    eventView: false,
    delete: {
      visible: false,
      board: false,
      mail: false,
      task: false,
    },
    error:{
      status: false,
      message: "",
      from: "",
    },
    KanbanView: false,
    sidebar: false,
    sidebarMobile: false,
    overlay: false,
    darkmode: false,
  }),
  getters: {},
  actions: {
    clearError() {
      this.error = {status: false, message: '', from: ''}
    },
    showError(error, from) {
      this.error = {
        status: true,
        message: error,
        from: from
      }
    },
    hideOverlay() {
      this.overlay = false;
      this.taskView = false;
      this.mailView = false;
      this.mailForm = false;
      this.eventForm = false,
      this.eventView = false,
      this.taskForm.visible = false;
      this.boardForm.visible = false;
      this.delete.visible = false;
      this.sidebar = false;
    },
  },
  async checkLoginState() {
    let response = await Auth.checkToken();
    this.isLoggedIn = response.valid;
    this.userId = response.userId;
    return this.isLoggedIn;
  },

  async login(username, password) {
    try {
      await Auth.login(username, password);
      this.isLoggedIn = true;
    } catch (error) {
      console.error(error.message);
      throw error; 
    }
  },

  async logout() {
    try {
      await Auth.logout();
      this.isLoggedIn = false;
    } catch (error) {
      console.error(error.message);
    }
  },
});
