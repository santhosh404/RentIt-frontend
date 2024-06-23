import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://rentit-backend-ipwa.onrender.com/api/v1',
    timeout: 10000
});