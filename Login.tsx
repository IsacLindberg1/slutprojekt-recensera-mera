import React, { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { NavLink } from 'react-router-dom'; 
import Register from './Register';

interface User {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [user, setUser] = useState<User>({
    username: '',
    password: '',
  });

  const loginUser = async () => {
    try {
      const response: AxiosResponse<string> = await axios.get(
        'https://localhost:7076/User/Login',
        {
          headers: {
            Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
          },
        }
      );

      localStorage.setItem('GUID', response.data);

      console.log('Login successful:', response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Login failed:', axiosError.response?.data);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div>
      <h2>Logga in</h2>
      <form>
        <div>
          <label>Användarnamn: </label>
          <input
            type="email"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
        </div><br />
        <div>
          <label>Lösenord: </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </div><br />
        <button type="button" onClick={loginUser}>
          Logga in
        </button>
      </form>
      <div>Har du inte ett konto?</div>  
        <NavLink to="/register">Registrera dig här</NavLink>
    </div>
  );
};

export default Login;
