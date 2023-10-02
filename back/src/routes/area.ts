import express, {Request, Response} from 'express';

const router = express.Router();

router.get('/api/areas', [], (req: Request, res: Response) => {
  return res.send('areas');
});

export {router as areasRouter};
