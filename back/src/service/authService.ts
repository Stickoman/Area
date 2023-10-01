import {retrieveUser, saveUser} from '../repository/userRepository';
import {genSalt, hash} from 'bcrypt';
import {IUser} from '../model/user';

type Credentials = {
  email: string;
  password: string;
}

function reject(reason: string): Promise<never> {
  return Promise.reject(new Error(reason));
}

async function hashPassword(credentials: Credentials): Promise<Credentials> {
  let salt = await genSalt(10);

  return {
    ...credentials,
    password: await hash(credentials.password, salt),
  };
}

async function userExists(email: string): Promise<boolean> {
  return await retrieveUser(email)
    .then(() => {
      return true;
    }).catch(() => {
      return false;
    });
}

async function register(credentials: Credentials): Promise<IUser> {
  const exists = await userExists(credentials.email);

  if (exists)
    return reject('User with this email already exists');
  return saveUser({
    firstName: '',
    lastName: '',
    ...await hashPassword(credentials),
  });
}

export {register};
