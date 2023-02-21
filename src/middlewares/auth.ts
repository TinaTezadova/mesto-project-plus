import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ICustomRequest } from '../types';

export default (req: ICustomRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходимо авторизоваться' });
  }
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
      return res
        .status(401)
        .send({ message: 'Необходимо авторизоваться' });
    }

    req.user = payload as JwtPayload;
    next();

};