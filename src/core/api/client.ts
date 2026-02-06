import axios from 'axios';
import {apiConfig} from '../../constants/api';

export const apiClient = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: 15000,
});
