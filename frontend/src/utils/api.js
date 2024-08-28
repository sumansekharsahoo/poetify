import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { "email":email, "password":password });
  return response.data;
};

export const signupUser = async (name,email, password) => {
  const response = await api.post('/auth/signup', { "name":name,"email":email, "password":password });
  return response.data;
}


export const logoutUser= async () => {
  const response = await api.post('/auth/logout',{"logout"  : true});
  return response.data;
}

export const pingHistory= async () => {
  const response = await api.get('/history/ping');
  return response.data;
}

export const getHistory= async (user_id) => {  
  const response = await api.post('/history/getChats',{"user_id": user_id});
  return response.data;
}

export const getPoem= async (prompt_id) => {
  console.log(prompt_id["id"]);
  const response =await api.post('/history/getPoem',{"prompt_id": prompt_id["id"]});
  return response.data;
}
