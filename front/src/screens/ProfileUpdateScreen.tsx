import React, { CSSProperties, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import NavigationBar from '../components/NavBarComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProfileInputComponent from '../components/ProfileInputComponent';

function ProfileScreen() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  async function fetchUserData() {
    try {
      const response = await axios.get('/api/me', {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error(error);
      navigate('/authentication');
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleStopEditing = () => {
    setIsEditing(false);
  };

  const handleUpdateField = (fieldName: string | number, value: any) => {
    const updatedUserData = { ...userData };
    updatedUserData[fieldName] = value;
    setUserData(updatedUserData);
  };

  return (
    <div>
      <NavigationBar color={'#000'}/>
      {userData && (
        <>
          <ProfileInputComponent
            value={userData.firstName ? userData.firstName.toString() : ''}
            label={'First Name'}
            labelHTML={'firstName'}
            userData={userData}
            isEditing={isEditing}
            startEditing={handleStartEditing}
            stopEditing={handleStopEditing}
            onUpdate={handleUpdateField}
          ></ProfileInputComponent>
          <ProfileInputComponent
            value={userData.lastName ? userData.lastName.toString() : ''}
            label={'Last Name'}
            labelHTML={'lastName'}
            userData={userData}
            isEditing={isEditing}
            startEditing={handleStartEditing}
            stopEditing={handleStopEditing}
            onUpdate={handleUpdateField}
          ></ProfileInputComponent>
          <ProfileInputComponent
            value={userData.email ? userData.email.toString() : ''}
            label={'Email'}
            labelHTML={'email'}
            userData={userData}
            isEditing={isEditing}
            startEditing={handleStartEditing}
            stopEditing={handleStopEditing}
            onUpdate={handleUpdateField}
          ></ProfileInputComponent>
          <ProfileInputComponent
            value={'*'.repeat(userData.password ? userData.password.toString().length : 0)}
            label={'Password'}
            labelHTML={'password'}
            userData={userData}
            isEditing={isEditing}
            startEditing={handleStartEditing}
            stopEditing={handleStopEditing}
            onUpdate={handleUpdateField}
          ></ProfileInputComponent>
        </>
      )}
    </div>
  );
}

export default ProfileScreen;
