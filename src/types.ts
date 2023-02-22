import { ObjectId } from 'mongoose';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ICustomRequest extends Request {
  user?: {
    _id: string | ObjectId;
  } | JwtPayload;
}

export type TErrors = 500 | 400 | 404 | 403 | 401 | 409;

export interface ICustomError extends Error {
  statusCode: TErrors,
  message: string
}
