import {useState} from 'react';
import InputText from '../common/InputText';
import {IProfile} from '../../screens/ProfileScreen';
import {handleFormSubmit} from '../../common/profile';

interface ProfileComponentProperties {
  user: IProfile;
}

function ProfileComponent(props: ProfileComponentProperties) {
  const [isEditing, setEditing] = useState(false);
  const [user, _] = useState(props.user);

  return (
    <div className="centered-container">
      <InputText type={'text'} disabled={!isEditing} value={user.firstName} callback={value => user.firstName = value} />
      <InputText type={'text'} disabled={!isEditing} value={user.lastName} callback={value => user.lastName = value} />
      <InputText type={'email'} disabled={!isEditing} value={user.email} callback={value => user.email = value} />

      {!isEditing && <button className="buttonStyle" onClick={() => setEditing(true)}>Edit</button>}
      {isEditing && <button className="buttonStyle" onClick={() => {
        setEditing(false);

        handleFormSubmit(user)
          .catch(reason => { console.log(reason) });
      }}>Save</button>}
    </div>
  )
}

export default ProfileComponent;
