import { Router } from 'express';
import { vdRouter } from './vending-machine';

const router = Router();

router.use('/vd', vdRouter);

export default router;