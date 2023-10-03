import React, {useState} from 'react';
import axios from 'axios';
import '../index.css';

function RegisterComponent() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const containerStyle = {
    maxWidth: '500px',
    margin: 'auto',
    marginTop: '50px',
    padding: '20px',
    borderRadius: '8px',
  };

  const labelStyle = {
    color: '#333',
    marginBottom: '8px',
    fontWeight: 'bold',
    display: 'block',
    fontSize: '1rem',
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        email: formData.email,
        password: formData.password,
      });

      console.log('User registered:', response.data);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{fontSize: '30px', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold'}}>Register</h1>
      <form onSubmit={handleRegister}>
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
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          required
          className="inputStyle"
        />
        <button type="submit" className="buttonStyle">Register</button>
      </form>
    </div>
  );
}

export default RegisterComponent;
