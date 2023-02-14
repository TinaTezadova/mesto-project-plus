import { Response, NextFunction } from 'express';
import { ICustomRequest } from '../types';

export const addUserId = (req: ICustomRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '63e8f1fea391bbedda21a508',
  };
  next();
};