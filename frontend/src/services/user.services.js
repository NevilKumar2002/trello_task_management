import axios from 'axios';
import authHeader from './auth.header';

const API_URL = "http://localhost:8000/api/boards/";

class UserService {
  createBoard(name, description) {
    return axios.post(`${API_URL}createboard`, { name, description }, { headers: authHeader() })
      .then(response => response.data)
      .catch(err => {
        console.error("Error creating board:", err);
        throw err;
      });
  }

  updateBoard(data) {
    return axios.post(`${API_URL}updateboard`, data, { headers: authHeader() })
      .then(response => response.data)
      .catch(err => {
        console.error("Error updating board:", err);
        throw err;
      });
  }

  addTask(bid, taskName, taskDescription, taskUsers, taskStage) {
    return axios.post(`${API_URL}addtask`, {
      b_id: bid,
      task: {
        name: taskName,
        description: taskDescription,
        members: taskUsers,
        stage: taskStage
      }
    }, { headers: authHeader() })
    .then(response => response.data)
    .catch(err => {
      console.error("Error adding task:", err);
      throw err;
    });
  }

  updateTask(data) {
    return axios.post(`${API_URL}updatetask`, data, { headers: authHeader() })
      .then(response => response.data)
      .catch(err => {
        console.error("Error updating task:", err);
        throw err;
      });
  }

  getBoards() {
    return axios.get(API_URL, { headers: authHeader() })
      .then(response => response.data)
      .catch(err => {
        console.error("Error fetching boards:", err);
        throw err;
      });
  }

  getBoard(id) {
    return axios.get(`${API_URL}${id}/Dashboard`, { headers: authHeader() })
      .then(response => response.data)
      .catch(err => {
        console.error("Error fetching board:", err);
        throw err;
      });
  }

  getDashboard(id) {
    return axios.get(`${API_URL}${id}/Dashboard`, { headers: authHeader() })
      .then(response => response.data)
      .catch(err => {
        console.error("Error fetching dashboard:", err);
        throw err;
      });
  }
}

export default new UserService();
