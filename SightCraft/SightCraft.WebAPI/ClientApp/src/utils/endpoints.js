const BASE_URL = 'https://localhost:5000/api';

export const Endpoints = {
  USER_REGISTRATION: () => `${BASE_URL}/identity/registration`,
  USER_LOGIN: () => `${BASE_URL}/identity/login`,
};
