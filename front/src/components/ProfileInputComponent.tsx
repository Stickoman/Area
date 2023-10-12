import React, { ChangeEvent, CSSProperties, FormEvent, useState } from 'react';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';

type ProfileProps = {
  value: string;
  label: string;
  labelHTML: string;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  isEditing: boolean;
  startEditing: () => void;
  stopEditing: () => void;
  onUpdate: (fieldName: string, value: string) => void;
};

function ProfileInputComponent(props: ProfileProps): JSX.Element {
  const inputStyle: CSSProperties = {
    margin: 0,
  };

  const buttonStyle: CSSProperties = {
    marginLeft: '8px',
    width: '150px',
  };

  const handleEditClick = () => {
    if (!props.isEditing) {
      props.startEditing();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onUpdate(props.labelHTML, e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/profile/update', {
        firstName: props.userData.firstName,
        lastName: props.userData.lastName,
        email: props.userData.email,
        password: '',
      }, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`,
        },
      });
      console.log('User updated:', response.data);
      props.stopEditing();
    } catch (error) {
      alert('Error updating:' + error);
    }
  };

  return (
    <div className={'profileData'}>
      <label htmlFor={props.labelHTML}>{props.label}</label>
      <div className={'inputContainer'}>
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <input
            type={props.labelHTML}
            className={`inputStyle ${props.isEditing ? 'editing' : ''} ${!props.isEditing ? 'readonly' : ''}`}
            style={inputStyle}
            value={props.value}
            onChange={handleInputChange}
            readOnly={!props.isEditing}
          />
          {!props.isEditing && (
            <FontAwesomeIcon icon={faPencil} className="editIcon" onClick={handleEditClick} />
          )}
          {props.isEditing && (
            <button className="buttonStyle" style={buttonStyle} type="submit">
              Save
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProfileInputComponent;
