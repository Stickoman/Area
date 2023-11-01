import {Router, Request, Response} from 'express';
import {login, register} from '../../service/authService';
import {AuthenticatedRequest, authenticateMiddleware} from '../../middleware/auth';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully registered and returns the user object (minus sensitive info like passwords).
 *       403:
 *         description: Email is already used.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required parameters in request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login an existing user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required parameters in request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/api/auth/login', [], async (req: Request, res: Response) => {
  if (req.body?.email && req.body?.password) {
    const {email, password} = req.body;

    try {
      const jwt = await login({email, password});
      res.status(200)
        .json({token: jwt});
    } catch (e) {
      res.status(403)
        .json({message: 'Invalid credentials'});
    }
  } else {
    res.status(400)
      .json({message: 'Invalid email or password'});
  }
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Logout the authenticated user.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Successfully logged out.
 *       401:
 *         description: Unauthorized.
 */
router.post('/api/auth/logout', authenticateMiddleware, (req: AuthenticatedRequest, res: Response) => {
  return res.send('Logged out!');
});

export {router as basicAuthRouter};
