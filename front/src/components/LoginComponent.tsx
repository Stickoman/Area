import React, {CSSProperties, useState} from 'react';
import '../index.css';

interface ILoginFormData {
  email: string;
  password: string;
}

interface ILoginComponentProperties {
  callback: (data: ILoginFormData) => void;
}

function LoginComponent(props: ILoginComponentProperties): React.JSX.Element {
  const [formData, setFormData] = useState({email: '', password: ''} as ILoginFormData);

  const containerStyle: CSSProperties = {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
  };

  const handleChange = (event: { target: { name: string, value: string; }; }) => {
    const {name, value} = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.callback(formData);
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

export {ILoginFormData};
export default LoginComponent;
