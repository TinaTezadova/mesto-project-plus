import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import { MongoError } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ICustomRequest } from '../types';
import { StatusCode } from '../consts';
import RequestError from '../errors/requestErrorConstructor';
import UsersService from '../services/usersService';

const usersService = new UsersService();

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersService.getUsers();
    return res.status(StatusCode.SUCSESS).send(users);
  } catch {
    const error = new RequestError('На сервере произошла ошибка', StatusCode.SERVER_ERROR);
    return next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.getUser(req.params.userId);
    if (!user) {
      const error = new RequestError('Запрашиваемый пользователь не найден', StatusCode.NOT_FOUND);
      return next(error);
    }
    return res.status(StatusCode.SUCSESS).send(user);
  } catch (err) {
    let error = new RequestError('На сервере произошла ошибка', StatusCode.SERVER_ERROR);
    if (err instanceof Error.CastError) {
      error = new RequestError('Передан некоррекный id', StatusCode.BAD_REQUEST);
    }
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await usersService.createUser({ ...req.body, password: hash });
    return res.status(StatusCode.CREATED).send(user);
  } catch (err) {
    let error = new RequestError('На сервере произошла ошибка', StatusCode.SERVER_ERROR);
    if (err instanceof Error.ValidationError) {
      error = new RequestError('Переданы некорректные данные', StatusCode.BAD_REQUEST);
    }
    if (err instanceof MongoError && err.code === 11000) {
      error = new RequestError('Пользователь с таким адресом уже существует', StatusCode.CONFLICT);
    }
    return next(error);
  }
};

export const updateUser = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.updateUser(req);
    if (!user) {
      const error = new RequestError('Запрашиваемый пользователь не найден', StatusCode.NOT_FOUND);
      return next(error);
    }
    return res.status(StatusCode.SUCSESS).send(user);
  } catch (err) {
    let error = new RequestError('На сервере произошла ошибка', StatusCode.SERVER_ERROR);
    if (err instanceof Error.ValidationError) {
      error = new RequestError('Переданы некорректные данные', StatusCode.BAD_REQUEST);
    }
    return next(error);
  }
};

export const updateUserAvatar = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.updateUserAvatar(req);
    if (!user) {
      const error = new RequestError('Запрашиваемый пользователь не найден', StatusCode.NOT_FOUND);
      return next(error);
    }
    return res.status(StatusCode.SUCSESS).send(user);
  } catch (err) {
    let error = new RequestError('На сервере произошла ошибка', StatusCode.SERVER_ERROR);
    if (err instanceof Error.ValidationError) {
      error = new RequestError('Переданы некорректные данные', StatusCode.BAD_REQUEST);
    }
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.findUser(email, password);
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

    return res.status(StatusCode.SUCSESS).send({ token });
  } catch (err) {
    const error = new RequestError('Неправильные почта или пароль', StatusCode.UNAUTORIZED);
    return next(error);
  }
};

export const getCurrentUser = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id;
    const user = await usersService.getUser(String(userId));
    if (!user) {
      const error = new RequestError('Данные о пользователе не найдены', StatusCode.NOT_FOUND);
      return next(error);
    }
    return res.status(StatusCode.SUCSESS).send(user);
  } catch (err) {
    let error = new RequestError('На сервере произошла ошибка', StatusCode.SERVER_ERROR);
    if (err instanceof Error.CastError) {
      error = new RequestError('Передан некоррекный id', StatusCode.BAD_REQUEST);
    }
    return next(error);
  }
};
