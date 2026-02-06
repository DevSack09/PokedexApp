import axios from 'axios';
import {apiConfig} from '../../shared/utils/api';

export const apiClient = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: 15000,
});
