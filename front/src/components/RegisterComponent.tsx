import React, {useState} from 'react';
import '../index.css';

interface IRegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface IRegisterComponentProperties {
  callback: (data: IRegisterFormData) => void;
}

function RegisterComponent(props: IRegisterComponentProperties): React.JSX.Element {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  } as IRegisterFormData);

  const containerStyle = {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
  };

  const handleChange = (event: { target: { name: string; value: string; }; }) => {
    const {name, value} = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    props.callback(formData);
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

export type {IRegisterFormData};
export default RegisterComponent;
