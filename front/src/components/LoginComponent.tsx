import React, {CSSProperties, useState} from 'react';
import '../index.css';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginComponentProps {
  callback: (data: LoginFormData) => void;
}

function LoginComponent(props: LoginComponentProps) {
  const [formData, setFormData] = useState({email: '', password: ''} as LoginFormData);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.callback(formData);
  };

  const containerStyle: CSSProperties = {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
  };

  const handleChange = (e: { target: { name: string, value: string; }; }) => {
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
    </div>
  );
}

export {LoginFormData};
export default LoginComponent;
