import axios from '../api/axios';

async function login(user, pwd) {
    await axios.post('http://localhost:3000/auth', { 
      user, 
      pwd 
    })
    .then((response) => {

      return response.data;
    } )
  }

  function register(user, pwd) {
    axios.post('http://localhost:3000/register', { 
      user, 
      pwd 
    })
    .then((response) => {
      login();
    })
  }

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload(true);
  };
  
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const authService = {
    register,
    login,
    logout,
    getCurrentUser,
  };

  export default authService;