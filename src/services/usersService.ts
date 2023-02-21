import { Request } from 'express';
import { ICustomRequest } from '../types';
import User, { IUser } from '../models/user';
import { findByIdAndUpdateParams } from '../consts';

class UsersService {
  getUsers() {
    return User.find({})
  }

  getUser(id: string) {
    return User.findById(id)
  }

  createUser(params: IUser) {
    return User.create(params)
  }

  updateUser(req: ICustomRequest) {
    const userId = req.user?._id;
    return User.findByIdAndUpdate(userId, req.body, findByIdAndUpdateParams)
  }

  updateUserAvatar(req: ICustomRequest) {
    const userId = req.user?._id;
    return User.findByIdAndUpdate(userId, req.body, findByIdAndUpdateParams)
  }

  findUser(email: string, password: string) {
    return User.findUserByCredentials(email, password)
  }
}
export default UsersService;