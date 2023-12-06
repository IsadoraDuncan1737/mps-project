const BASE_URL = 'https://localhost:5000/api';

export const Endpoints = {
  USER_REGISTRATION: () => `${BASE_URL}/identity/registration`,
  USER_LOGIN: () => `${BASE_URL}/identity/login`,
  SIGHT_CREATE: () => `${BASE_URL}/sight`,
  SIGHTS_GETALL: () => `${BASE_URL}/sight`,
  SIGHT_GETBYID: (id) => `${BASE_URL}/sight/${id}`,
  USER_GETBYID: (id) => `${BASE_URL}/user/${id}`,
  USER_GETCURRENT: () => `${BASE_URL}/user/current-user`,
  SIGHT_DELETE: (id) => `${BASE_URL}/sight/${id}`,
  SIGHT_PUT: (id) => `${BASE_URL}/sight/${id}`,
};
