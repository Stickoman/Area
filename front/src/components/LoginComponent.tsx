import React, {CSSProperties, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../index.css';
import {useNavigate} from 'react-router-dom';

function LoginComponent() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);
      const token = response.data.token;
      Cookies.set('token', token);
      navigate('/profile');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  const containerStyle: CSSProperties = {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
  };
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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


      <div onClick={async () => {
        try {
          window.location.href = "http://localhost:8080/api/auth/twitter";
          /*const response = await axios.get('/api/auth/twitter', {});

          if (response.data && response.data.url) {
            window.location.href = response.data.url;
          } else {
            console.error('Unable to parse response', response);
          }*/
        } catch (error) {
          console.error('Twitter login failed:', error);
          alert('Failed to login with Twitter. Please try again.');
        }
      }}>
        <img
          src="https://cdn.cms-twdigitalassets.com/content/dam/developer-twitter/auth-docs/sign-in-with-twitter-link.png.twimg.1920.png"
          width="141px" height="16px"
          data-src="https://cdn.cms-twdigitalassets.com/content/dam/developer-twitter/auth-docs/sign-in-with-twitter-link.png.twimg.1920.png"
          alt="" data-object-fit="cover"/>
      </div>
    </div>
  );
}

export default LoginComponent;
