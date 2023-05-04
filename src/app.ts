import { config } from 'dotenv';
import express from 'express';
import { errors } from 'celebrate';
import mongoose from 'mongoose';
import path from 'path';
import routes from './routes';
import { login, createUser } from './controllers/users';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import { getCelebrationConfForLogin } from './utils';
import errorHandler from './middlewares/error-handler';

config({ path: path.join(__dirname, '..', '.env') });

const { PORT } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', getCelebrationConfForLogin(), login);
app.post('/signup', getCelebrationConfForLogin(), createUser);
app.use(auth);

app.use('/', routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
app.listen(PORT);
