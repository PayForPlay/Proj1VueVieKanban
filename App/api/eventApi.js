import axios from "axios";
axios.defaults.withCredentials = true;
const API_URL = "http://localhost:3000/api/events/";

class Event {
  static async fetchEvents() {
    try {
      const response = await axios.get(API_URL);
      const revisedData = {
        events: response.data,
      };
      if (response.status) {
        return revisedData;
      }
      console.log(revisedData)
    } catch (error) {
      console.log(error)
    }
  }

  static async addEvent(event) {
    const response = await axios.post(API_URL, event);
    return response
  }

  static async updateEvent(event) {
    const response = await axios.put(API_URL, event);
    return response
  }

  static async deleteEvent(event) {
    const response = await axios.delete(API_URL, {data: event});
    return response
  }
}

export default Event;
