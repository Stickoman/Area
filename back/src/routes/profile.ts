import {Router, Response} from 'express';
import {AuthenticatedRequest, authenticateMiddleware} from '../middleware/auth';
import {updateUserProfile} from '../service/profileService';

const router = Router();

/**
 * @swagger
 * /api/me:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Get current user profile.
 *     tags:
 *       - Profile
 *     responses:
 *       200:
 *         description: Successfully returns the profile of the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *       401:
 *         description: Unauthorized.
 */
router.get('/api/me', authenticateMiddleware, (req: AuthenticatedRequest, res: Response) => {
  return res.send(req.user);
});

/**
 * @swagger
 * /api/profile:
 *   put:
 *     security:
 *       - Bearer: []
 *     summary: Update user profile.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the user profile.
 *       400:
 *         description: Missing required parameters in request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.put('/api/profile', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const data = req.body;

    if (data.email && data.firstName && data.lastName) {
      await updateUserProfile(userId, data);
      res.sendStatus(200);
    } else {
      const missingProperties = ['email', 'firstName', 'lastName']
        .filter(prop => !data[prop])
        .join(', ');

      res.status(400).json({message: `Missing ${missingProperties} in body`});
    }
  } catch (error) {
    console.error('Error updating user', error);
    res.sendStatus(500);
  }
});

export {router as profileRouter};
