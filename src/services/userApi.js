import axios from 'axios';

export const fetchUserExists = username => {
  console.log(`/api/users/${username}/exists`);
  return axios.get(`/api/users/${username}/exists`);
};
