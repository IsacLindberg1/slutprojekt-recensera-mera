import React, { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  UserName: string;
  Email: string;
  Password: string;
}

const Register: React.FC = () => {
    const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    UserName: '',
    Email: '',
    Password: '',
  });

  const [message, setMessage] = useState<string>("");

  const createUser = async () => {
    try {
      const response: AxiosResponse<string> = await axios.post(
        'https://localhost:7076/User/CreateUser',
        user
      );
      localStorage.setItem('GUID', response.data);
      console.log('User created successfully:', response.data);
      setMessage("Användare skapad! Du kan nu logga in.");
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
          
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error creating user:', axiosError.response?.data);
      setMessage("Misslyckades att skapa användaren.");
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
      <h2>Skapa ett konto</h2>
      <h3>{message}</h3>
      <form>
        <div>
          <label>Username: </label>
          <input
            type="text"
            name="UserName"
            value={user.UserName}
            onChange={handleInputChange}
          />
        </div><br />
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="Email"
            value={user.Email}
            onChange={handleInputChange}
          />
        </div><br />
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="Password"
            value={user.Password}
            onChange={handleInputChange}
          />
        </div><br />
        <button type="button" onClick={createUser}>
          Skapa konto
        </button>
      </form>
    </div>
  );
};

export default Register;