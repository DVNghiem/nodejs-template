import { Request, Response, Router } from 'express';
import transactionController from '../controllers/TransactionController';
import userController from '../controllers/UserController';

const router = Router();


router.post('/callback', transactionController.saveTransaction);
router.get('/get', transactionController.getTransaction);

router.post('/register', userController.register);

export default router;
