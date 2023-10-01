import {Router, Request, Response} from 'express';
import {login, register} from '../service/authService';
import {authenticateMiddleware} from '../middleware/auth';

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

router.post('/api/auth/login', [], async (req: Request, res: Response) => {
  if (req.body?.email && req.body?.password) {
    const {email, password} = req.body;

    try {
      const jwt = await login({email, password});

      res.status(200)
        .json({token: jwt});
    } catch (e) {
      res.status(401)
        .json({message: 'Invalid credentials'});
    }
  } else {
    res.status(400)
      .json({message: 'Invalid email or password'});
  }
});

router.post('/api/auth/logout', authenticateMiddleware, (req: Request, res: Response) => {
  return res.send('Logged out!');
});

export {router as authRouter};
