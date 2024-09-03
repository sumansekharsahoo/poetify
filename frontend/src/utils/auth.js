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
  	let id = localStorage.getItem('poetifytoken').split(',')[0];
	console.log(typeof(id));
	return id;
}

export const getUserName=()=>{
  let name = localStorage.getItem('poetifytoken').split(',')[1];
  return name;
}
