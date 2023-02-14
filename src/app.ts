import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import { addUserId } from './middlewares/addUserId';
import mongoose from 'mongoose';
import path from 'path';
import routes from './routes';
import { ICustomError } from './types';

config({ path: path.join(__dirname, '..', '.env') })

const { PORT } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(addUserId);

app.use('/', routes);

app.use((err: ICustomError, req: Request, res: Response) => {
  res.status(err.statusCode).send({ message: err.message });
});
app.listen(PORT);