import {IUser} from '../model/user';
import {Model} from 'mongoose';

async function updateUserProfile(userId: string, updatedData: Partial<IUser>): Promise<IUser | null> {
  try {
    const UserModel: Model<IUser> = require('../model/user').User;
    const user = await UserModel.findById(userId);

    if (!user)
      throw new Error('User not found');
    if (updatedData.firstName != user.firstName)
      user.firstName = updatedData.firstName;
    if (updatedData.lastName != user.lastName)
      user.lastName = updatedData.lastName;
    if (updatedData.email != user.email)
      user.email = updatedData.email;
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

export {updateUserProfile};
