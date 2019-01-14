import axios from 'axios';

export const fetchUserExists = username => {
  return axios.get(`/api/v1/users/${username}/exists`);
};
