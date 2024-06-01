import axios from 'axios';
import { useAuthStore } from '../src/stores/AuthStore'

// Создаем экземпляр axios с настройкой по умолчанию
const axiosInstance = axios.create();

// Используем интерцепторы для добавления заголовка к каждому исходящему запросу
axiosInstance.interceptors.request.use(config => {
  const authStore = useAuthStore()
  // Получаем socketId из authStore
  const socketId = authStore.socketId;
  
  // Устанавливаем заголовок в каждый запрос, если socketId доступен
  if (socketId) {
    config.headers['X-Socket-ID'] = socketId;
  }

  return config;
}, error => {
  console.log(error);
  // return Promise.reject(error);
});

export default axiosInstance;
