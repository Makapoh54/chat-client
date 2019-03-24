import axios from 'axios';

export const fetchUserExists = async username => {
  return (await axios.get(`/api/v1/users/${username}/exists`)).data;
};
