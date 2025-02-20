import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async (): Promise<any[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};
  
