import { ObjectId } from 'mongoose';
import { Request } from 'express';

export interface ICustomRequest extends Request {
  user?: {
    _id: string | ObjectId;
  };
};

export type TErrors = 500 | 400 | 404 | 403 | 201 | 200;

export interface ICustomError extends Error {
  statusCode: TErrors,
  message: string
}