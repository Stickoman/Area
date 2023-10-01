import express, {Request, Response} from 'express';

const router = express.Router();

router.post('/api/auth/register', [], (req: Request, res: Response) => {
  return res.send('registered');
});

router.post('/api/auth/login', [], (req: Request, res: Response) => {
  return res.send('logged');
});

router.post('/api/auth/logout', [], (req: Request, res: Response) => {
  return res.send('logged out');
});

export {router as authRouter};
