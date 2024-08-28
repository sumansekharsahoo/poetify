export const setToken = (token) => {
  localStorage.setItem('poetifytoken', token);
};

export const delToken = () => {
  localStorage.removeItem('poetifytoken');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('poetifytoken');
};

export const getUserId=()=>{
  return localStorage.getItem('poetifytoken');
}