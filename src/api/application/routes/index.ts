import { Request, Response, Router } from 'express';
import userController from '../controllers/UserController';

const router = Router();

router.get('/find-by-email', userController.findByEmail);

export default router;
