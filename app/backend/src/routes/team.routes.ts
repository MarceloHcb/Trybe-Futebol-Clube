import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const router = Router();

router.get('/', (req, res) => teamController.findAllTeams(req, res));
router.get('/:id', (req, res) => teamController.findTeamById(req, res));

export default router;
