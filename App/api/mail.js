//mail.js
import axiosInstance from "./httpConfig"
const API_URL = "http://localhost:3000/api/Mail/";

class Mail {
  static async fetchMails() {
    try {
      const response = await axiosInstance.get(API_URL);
      const revisedData = {
        mails: response.data,
      };

      if (response.status) {
        return revisedData;
      }
    } catch (error) {
      console.log(error)
    }
  }

  static async sentMail(data) {
    const response = await axiosInstance.post(API_URL, data);
    return response;
  }
  
  static async changeStatusMail(mail, userId) {
    const updatedMail = {
      ...mail,
      recipients: mail.recipients.map((recipient) => {
        if (recipient.user._id === userId) {
          return {
            ...recipient,
            readStatus: true,
          };
        }
        return recipient;
      })
    };
    let response = await axiosInstance.put(API_URL, updatedMail);
    return response;
  }

  static async restoreMail(mail, userId) {
    const updatedMail = {
      ...mail,
      recipients: mail.recipients.map((recipient) => {
        if (recipient.user._id === userId) {
          return {
            ...recipient,
            deleted: false,
            deletedAt: null,
          };
        }
        return recipient;
      }),
      deleted: mail.sender._id === userId ? false : mail.deleted,
      deletedAt: mail.sender._id === userId ? null : mail.deletedAt,
    };
    let response = await axiosInstance.put(API_URL, updatedMail);
    return response;
  }

  static async deleteMail(mail) {
    let response = await axiosInstance.delete(API_URL, { data: mail });
    return response;
  }
}

export default Mail;
