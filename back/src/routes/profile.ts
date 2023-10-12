import {Router, Response} from 'express';
import {AuthenticatedRequest, authenticateMiddleware} from '../middleware/auth';
import {updateUserProfile} from '../service/profileService';

const router = Router();

router.get('/api/me', authenticateMiddleware, (req: AuthenticatedRequest, res: Response) => {
  return res.send(req.user);
});

router.put('/api/profile', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const data = req.body;

    if (data.email && data.firstName && data.lastName) {
      await updateUserProfile(userId, data);
      res.sendStatus(200);
    } else {
      res.status(400).json({message: 'Missing email, firstName or lastName in body'});
    }
  } catch (error) {
    console.error('Error updating user', error);
    res.sendStatus(500);
  }
});

export {router as profileRouter};
