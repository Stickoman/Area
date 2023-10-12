import {Router, Response} from 'express';
import {AuthenticatedRequest, authenticateMiddleware} from '../middleware/auth';
import {updateUserProfile} from '../service/profileService';

const router = Router();

router.get('/api/me', authenticateMiddleware, (req: AuthenticatedRequest, res: Response) => {
  return res.send({
    ...req.user,
  });
});

router.post('/api/profile/update', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const updatedProfileData = req.body;
    const updatedProfile = await updateUserProfile(userId, updatedProfileData);

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error updating the profile' });
  }
});

export {router as profileRouter};
