import { Request } from 'express';
import { ICustomRequest } from '../types';
import User from '../models/user';
import { findByIdAndUpdateParams } from '../consts';

class UsersService {
  getUsers() {
    return User.find({})
  }

  getUser(id: string) {
    return User.findById(id)
  }

  createUser(req: Request) {
    return User.create(req.body)
  }

  updateUser(req: ICustomRequest) {
    const userId = req.user?._id;
    return User.findByIdAndUpdate(userId, req.body, findByIdAndUpdateParams)
  }

  updateUserAvatar(req: ICustomRequest) {
    const userId = req.user?._id;
    return User.findByIdAndUpdate(userId, req.body, findByIdAndUpdateParams)
  }
}
export default UsersService;