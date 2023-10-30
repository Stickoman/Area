import {IUser, User} from '../model/user';
import {compare, genSalt, hash} from 'bcrypt';
import {retrieveUser, saveUser} from '../repository/userRepository';

import {generateAccessToken} from '../middleware/auth';

const EMAIL_REGEX: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
const PASSWORD_CHARACTERS: string = '@?:-_~&=+/*%*^\\!.,;<>"\'()[]{}$';
const PASSWORD_LENGTH: number = 8;

type Credentials = {
  email: string;
  password: string;
}

const isString = (object: string | object): object is string => {
  return typeof object === 'string';
};

function reject(reason: string | Error): Promise<never> {
  if (isString(reason))
    return Promise.reject(new Error(reason));
  return Promise.reject(reason);
}

async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(10);

  return await hash(password, salt);
}

async function userExists(email: string): Promise<boolean> {
  return await retrieveUser(email)
    .then(() => {
      return true;
    }).catch(() => {
      return false;
    });
}

function isValidCredentials(credentials: Credentials): boolean {
  const email = credentials.email.trim();
  const password = credentials.password.trim();

  const validEmail: boolean = EMAIL_REGEX.test(email);
  const validPasswordLength: boolean = password.length >= PASSWORD_LENGTH;
  const specialCharacters: string[] = password.split('')
    .filter(character => PASSWORD_CHARACTERS.includes(character));

  return (validEmail && validPasswordLength && specialCharacters.length > 0);
}

async function register(credentials: Credentials): Promise<IUser> {
  const exists = await userExists(credentials.email);

  if (exists)
    return reject('User with this email already exists');
  if (!isValidCredentials(credentials))
    return reject('Invalid credentials');
  return saveUser({
    email: credentials.email,
    password: await hashPassword(credentials.password),
    firstName: '',
    lastName: '',
    twitterId: '',
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
    });
}

async function retrieveAssociatedTwitterUser(twitterId: string): Promise<IUser> {
  const user = await User.findOne({twitterId: twitterId}).exec();

  if (user === null)
    return reject('Unable to find a user associated with this Twitter account');
  return user as IUser;
}
async function retrieveAssociatedFacebookUser(facebookId: string): Promise<IUser> {
  const user = await User.findOne({facebookId: facebookId}).exec();

  if (user === null)
    return reject('Unable to find a user associated with this Facebook account');
  return user as IUser;
}
async function retrieveAssociatedRedditUser(redditId: string): Promise<IUser> {
  const user = await User.findOne({redditId: redditId}).exec();

  if (user === null)
    return reject('Unable to find a user associated with this Reddit account');
  return user as IUser;
}
async function retrieveAssociatedDiscord(discordId: string): Promise<IUser> {
  const user = await User.findOne({discordId: discordId}).exec();

  if (user === null)
    return reject('Unable to find a user associated with this Discord account');
  return user as IUser;
}

async function retrieveAssociatedGithub(githubId: string): Promise<IUser> {
  const user = await User.findOne({githubId: githubId}).exec();

  if (user === null)
    return reject('Unable to find a user associated with this Github account');
  return user as IUser;
}

async function retrieveAssociatedGoogle(googleId: string): Promise<IUser> {
  const user = await User.findOne({googleId: googleId}).exec();

  if (user === null)
    return reject('Unable to find a user associated with this Google account');
  return user as IUser;
}

async function retrieveAssociatedMicrosoft(microsoftId: string): Promise<IUser> {
  const user = await User.findOne({microsoftId: microsoftId}).exec();

  if (user === null)
    return reject('Unable to find a user associated with this Microsoft account');
  return user as IUser;
}

export type {Credentials};
export {isString, register, login, retrieveAssociatedTwitterUser, retrieveAssociatedFacebookUser, retrieveAssociatedRedditUser, retrieveAssociatedGithub, retrieveAssociatedDiscord, retrieveAssociatedGoogle, retrieveAssociatedMicrosoft, hashPassword, reject};
