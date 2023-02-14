import express, { Request, Response } from 'express';
import { addUserId } from './middlewares/addUserId';
import mongoose from 'mongoose';
import path from 'path';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards'
import { ICustomError } from './types';

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(addUserId);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.use((err: ICustomError, req: Request, res: Response) => {
  res.status(err.statusCode).send({ message: err.message });
});
app.listen(PORT);