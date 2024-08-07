import {API_URL_ANDROID, API_URL_IOS, API_URL as PROD_URL, STAGE} from '@env';
import axios from 'axios';
import {Platform} from 'react-native';
import {StorageAdapter} from '../adapter/storage-adapter';

export const API_URL =
  STAGE === 'production'
    ? PROD_URL
    : Platform.OS === 'ios'
    ? API_URL_IOS
    : API_URL_ANDROID;

const iShopApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

//TODO: agregar interceptores
iShopApi.interceptors.request.use(
  async config => {
    const token = await StorageAdapter.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
     
    }
     return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export {iShopApi};
