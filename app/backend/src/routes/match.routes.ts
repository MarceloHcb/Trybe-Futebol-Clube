import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const router = Router();
const matchController = new MatchController();

router.get('/', matchController.findAllTeams);
router.patch('/:id/finish', Validations.validateToken, matchController.FinishedMatch);
router.patch('/:id', Validations.validateToken, matchController.UpdateMatch);
router.post('/', Validations.validateToken, matchController.CreateMatch);

export default router;
