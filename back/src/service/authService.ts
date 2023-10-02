import {retrieveUser, saveUser} from '../repository/userRepository';
import {genSalt, hash, compare} from 'bcrypt';
import {IUser} from '../model/user';
import {generateAccessToken} from '../middleware/auth';

type Credentials = {
  email: string;
  password: string;
}

const isString = (object: any) : object is string  => {
  return typeof object === 'string';
}

function reject(reason: any): Promise<never> {
  if (isString(reason))
    return Promise.reject(new Error(reason));
  return Promise.reject(reason);
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

async function login(credentials: Credentials): Promise<string> {
  return retrieveUser(credentials.email)
    .then(async user => {
      const validCredentials = await compare(credentials.password, user.password);

      if (!validCredentials)
        return reject('Invalid credentials');
      return generateAccessToken(user);
    })
    .catch(reason => {
      return reject(reason);
    })
}

export {isString, register, login};
