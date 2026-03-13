import api from './api';

export const createProfile = async (profileData) => {
  const response = await api.post('/profile/create', profileData);
  return response.data;
};

export const getProfile = async (userId) => {
  const response = await api.get(`/profile/${userId}`);
  return response.data;
};

export const updateProfile = async (userId, profileData) => {
  const response = await api.put(`/profile/update/${userId}`, profileData);
  return response.data;
};
