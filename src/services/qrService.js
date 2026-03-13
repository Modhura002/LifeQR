import api from './api';

export const generateQR = async (profileId) => {
  const response = await api.post(`/qr/generate/${profileId}`);
  return response.data;
};
