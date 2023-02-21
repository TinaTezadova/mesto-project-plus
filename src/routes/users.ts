import { Router } from 'express';
import { Joi } from 'celebrate';
import { getUsers, getUser, updateUser, updateUserAvatar, getCurrentUser } from '../controllers/users';
import { getCelebrateConfig } from '../utils';

const userRouter = Router();

userRouter.get('/', getCelebrateConfig(), getUsers);

userRouter.get('/:userId', getCelebrateConfig({
  userId: Joi.string().alphanum(),
}), getUser);

userRouter.get('/me', getCelebrateConfig(), getCurrentUser);

userRouter.patch('/me', getCelebrateConfig(undefined, {
  name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
}), updateUser);

userRouter.patch('/me/avatar', getCelebrateConfig(undefined, {
  avatar: Joi.string().dataUri().required()
}), updateUserAvatar);

export default userRouter;