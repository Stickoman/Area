import {Router, Request, Response} from 'express';
import {register} from '../service/authService';

const router = Router();

router.post('/api/auth/register', [], async (req: Request, res: Response) => {
  if (req.body?.email && req.body?.password) {
    const {email, password} = req.body;

    try {
      const user = await register({email, password});

      res.status(201)
        .json(user);
    } catch (e) {
      res.status(403)
        .json({message: 'Email is already used'});
    }
  } else {
    res.status(400)
      .json({message: 'Invalid email or password'});
  }
});

router.post('/api/auth/login', [], (req: Request, res: Response) => {
  return res.send('logged');
});

router.post('/api/auth/logout', [], (req: Request, res: Response) => {
  return res.send('logged out');
});

export {router as authRouter};
