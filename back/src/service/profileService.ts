import {IUser, User} from '../model/user';

async function updateUserProfile(userId: string, profile: IUser) {
  try {
    const user = await User.findById(userId).exec();

    user.email = profile.email;
    user.firstName = profile.firstName;
    user.lastName = profile.lastName;
    await user.save();
  } catch (error) {
    console.error('Unable to update user', error);
  }
}

export {updateUserProfile};
