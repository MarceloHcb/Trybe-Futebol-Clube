import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const router = Router();

router.get('/', teamController.findAllTeams);
router.get('/:id', teamController.findTeamById);

export default router;
