import React, {useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../index.css';

function LoginComponent() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const containerStyle = {
    maxWidth: '500px',
    margin: 'auto',
    marginTop: '50px',
    padding: '20px',
    borderRadius: '8px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    fontSize: '1rem',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    color: '#333',
    marginBottom: '8px',
    fontWeight: 'bold',
    display: 'block',
    fontSize: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);
      const token = response.data.token;
      Cookies.set('token', token);
      console.log('User logged in with token:', token);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{fontSize: '30px', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold'}}>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="inputStyle"
        />
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="inputStyle"
        />
        <button type="submit" className="buttonStyle">Login</button>
      </form>
    </div>
  );
}

export default LoginComponent;
