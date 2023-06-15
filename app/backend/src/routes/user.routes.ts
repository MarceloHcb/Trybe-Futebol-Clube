import { Router } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const router = Router();
const userController = new UserController();
router.post('/', userController.login);
router.get('/role', Validations.validateToken, userController.findByRole);

export default router;
