// mails.js
import { defineStore } from "pinia";
import Mail from "../../api/mail";
import { useAuthStore } from "./AuthStore";

export const useMailsStore = defineStore({
  id: "mails", 
  state: () => ({
    mails: [], 
    filteredMails: [],
    mailFilter: "relevant",
    selectedMail: 0,
    unread: 0,
  }),
  getters: {
    getMail: (state) => state.mails[state.selectedMail],
  },
  actions: {

    async addMail(data) {
      this.mails.push(data);
      this.filterMails();
    },

    updateMail(data) {
      this.mails[this.selectedMail] = data;
      this.filterMails();
    },
    
    async changeStatus(mail) {
      const AuthStore = useAuthStore();
      const response = await Mail.changeStatusMail(mail, AuthStore.userId);
      this.updateMail(response.data.updatedMail);
      this.filterMails();
    },

    async restoreMail(mail) {
      const AuthStore = useAuthStore();
      const response = await Mail.restoreMail(mail, AuthStore.userId);
      this.updateMail(response.data.updatedMail);
      this.filterMails();
    },

    async deleteMail(mail) {
      const response = await Mail.deleteMail(mail, );
      if (response.status === 201) {
        this.updateMail(response.data.updatedMail);
      }
      if (response.status === 202) {
        this.mails.splice(this.selectedMail, 1);
        this.filterMails();
      }
    },

    UpdateSelectedMail(data) {
      if (data._id) {
        this.selectedMail = this.mails.findIndex(
          (mail) => mail._id === data._id
        );
      } else {
        this.mails[this.selectedMail] = data;
      }
    },
    CountUnread() {
      const AuthStore = useAuthStore();
      this.unread = 0
     this.mails.forEach(mail => {
      mail.recipients.forEach(recipient => {
        if (recipient.user._id === AuthStore.userId && !recipient.readStatus) {
          this.unread += 1
        }
      });
     });
    },

    async getData() {
      try {
        const jsonData = await Mail.fetchMails();
        this.mails = jsonData.mails;
        this.filterMails();
        this.CountUnread()
      } catch (error) {
        console.log(error)
      }
    },

    filterMails() {
      const AuthStore = useAuthStore();
      if (this.mailFilter === "relevant") {
        this.filteredMails = this.mails.filter(mail => {
          return mail.recipients.some(recipient => {
            return recipient?.user?._id === AuthStore.userId && !recipient.deleted;
          });
        });
      } else if (this.mailFilter === "sent") {
        this.filteredMails = this.mails.filter(mail => {
          return mail.sender._id === AuthStore.userId && !mail.deleted
        });
      } else if (this.mailFilter === "deleted") {
        this.filteredMails = this.mails.filter(mail => {
          return mail.recipients.some(recipient => {
            return recipient.user._id === AuthStore.userId && recipient.deleted || mail.deleted && mail.sender._id === AuthStore.userId;
          });
        });
      }
    }
  },
});
