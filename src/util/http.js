import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
let token = '';

export const http = () => {

  if (localStorage.getItem('token') !== null) {
    token = localStorage.getItem('token');
  }
    const axiosInstance = axios.create({
    baseURL: 'http://52.240.152.136/api',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return axiosInstance;
};

export const httpUMS = () => {
    const axiosInstance = axios.create({
    baseURL: 'http://invtestsrv00.northcentralus.cloudapp.azure.com/newums.service/api/Account',
    headers: {
      'X-ClientSecret': 'PkR8m9jYmkfeCF9UNRyPLEOxP/9tfg9hrHpgaEnGdDQ=',
      accept: 'application/json',
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return axiosInstance;
};

