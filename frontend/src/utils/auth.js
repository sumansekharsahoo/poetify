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
  return localStorage.getItem('poetifytoken')[0];
}

export const getUserName=()=>{
  let len=localStorage.getItem('poetifytoken').length;
  return localStorage.getItem('poetifytoken').substring(2,len);
}