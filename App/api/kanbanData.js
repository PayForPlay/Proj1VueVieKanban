import axiosInstance from "./httpConfig"
const API_URL = "http://localhost:3000/api/board/";

class kanbanData {
  static async fetchAll() {
    try {
      const response = await axiosInstance.get(API_URL);
      const revisedData = {
        boards: response.data,
      };
      return revisedData;
    } catch (error) {
      throw error;
    }
  }
  static async addTask(data) {
    try {
      const response = await axiosInstance.post(API_URL + "tasks", data);
      return response.data;
    } catch (error) {
      console.error("Error in addTask:", error);
    }
  }

  static async updateTask(data) {
    try {
      const response = await axiosInstance.put(API_URL + "tasks", data);
      return response;
    } catch (error) {
      console.error("Error in updateTask:", error);
    }
  }

  static async changeTaskColumn(data) {
    const delData = {
      boardId: data.boardId,
      columnId: data.columnIdfrom,
      taskId: data.taskId,
    };

    delete data.task.status;

    const addData = {
      boardId: data.boardId,
      columnId: data.columnIdto,
      task: data.task,
    };
    try {
      await this.deleteTask(delData);
      const response = await this.addTask(addData);
      return response;
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteTask(data) {
    try {
      const response = await axiosInstance.delete(API_URL + "tasks", { data: data });
      return response.status;
    } catch (error) {
      console.log("Error in deleteTask:", error);
    }
  }

  static async deleteBoard(data) {
    try {
      const response = await axiosInstance.delete(API_URL, { data: data });
      return response.status;
    } catch (error) {
      console.log("Error in deleteBoard:", error);
    }
  }

  static async addBoard(data) {
    try {
      const response = await axiosInstance.post(API_URL, data);
      return response;
    } catch (error) {
      console.log("Error in addBoard:", error);
    }
  }

  static async updateBoard(data) {
    try {
      const response = await axiosInstance.put(API_URL, data);
      return response;
    } catch (error) {
      console.log("Error in updateBoard:", error);
    }
  }

  static async subTask(data) {
    try {
      const response = await axiosInstance.put(API_URL + "subtasks", data);
      return response.data;
    } catch (error) {
      console.log("Error in updateBoard:", error);
    }
  }
}

export default kanbanData;
