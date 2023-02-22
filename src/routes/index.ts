import { Router } from 'express';
import cardsRouter from './cards';
import usersRouter from './users';

const router = Router();
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

export default router;
