import express, {Request, Response} from 'express';

const router = express.Router();

router.get('/api/services', [], (req: Request, res: Response) => {
  return res.send('services');
});

export {router as servicesRouter};
