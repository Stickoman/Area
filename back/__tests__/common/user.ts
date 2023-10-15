import {Credentials, hashPassword} from '../../src/service/authService';
import {IUser, User} from '../../src/model/user';

const USER_CREDENTIALS: Credentials = {
  email: 'user@gmail.com',
  password: 'password!',
};

async function saveUser(credentials: Credentials): Promise<IUser> {
  const hashedCredentials: Credentials = {
    ...credentials,
    password: await hashPassword(credentials.password),
  };
  const user = await new User(hashedCredentials).save();

  return user as IUser;

}

export {USER_CREDENTIALS, saveUser};
