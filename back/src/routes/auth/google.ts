import {Router, Response, Request} from 'express';
import {isString, retrieveAssociatedGoogle} from '../../service/authService';
import {GoogleResponse, registerGoogleAccount, requestAccessToken} from '../../service/googleService';
import {IUser, User} from '../../model/user';
import {IGoogleAuthentication} from '../../model/googleAuth';
import {AuthenticatedRequest, authenticateMiddleware, generateAccessToken} from '../../middleware/auth';
import {initOAuthFlow} from '../../service/oauthService';

const router = Router();

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Initiate Google OAuth2 process.
 *     tags:
 *       - OAuth
 *     responses:
 *       302:
 *         description: Redirects to Google OAuth2 page.
 *       500:
 *         description: Error initiating Google authentication.
 */
router.get('/api/auth/google', [], async (req: Request, res: Response) => {
  try {
    const API_URL = process.env.API_URL;
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const REDIRECT_URI = `${API_URL}/auth/google/callback`;
    const SCOPE = 'profile email https://www.googleapis.com/auth/gmail.modify';

    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`);
  } catch (error) {
    console.warn('GOOGLE OAUTH', error);
    res.status(500).send('Error initiating Google auth');
  }
});

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Handle Google OAuth2 callback.
 *     tags:
 *       - OAuth
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         description: Authorization code returned by Google.
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirects to the application
 *       400:
 *         description: Unable to parse authorization code.
 *       500:
 *         description: Error during Google callback processing.
 */
router.get('/api/auth/google/callback', [], async (req: Request, res: Response) => {
  const code = req.query.code as string | undefined;

  if (!isString(code)) {
    res.status(400).send('Unable to parse parameter code');
    return;
  }

  try {
    const FRONT_URL = process.env.FRONT_URL;
    const response: GoogleResponse = await requestAccessToken(code);
    const account: IGoogleAuthentication = await registerGoogleAccount(response);
    retrieveAssociatedGoogle(account.id)
      .then(async (user: IUser) => {
        const document = await User.findOne({googleId: account.id}).exec();

        document.googleId = account.id;
        document.googleEmail = account.email;
        await document.save();
        res.redirect(`${FRONT_URL}/login?jwt=${generateAccessToken(user)}&name=${account.screenName}`);
      })
      .catch(async (user: IUser) => {
        const id: string = initOAuthFlow('google', account.id, account.screenName, account.email);
        res.redirect(`${FRONT_URL}/oauth?id=${id}`);
      });
  } catch (error) {
    res.status(500).send('Error during Google callback processing');
    console.warn(error);
  }
});

/**
 * @swagger
 * /api/auth/google/disassociate:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Disassociate the authenticated user's account from Google.
 *     tags:
 *       - OAuth
 *     responses:
 *       200:
 *         description: Successfully disassociated Google from the user's account.
 *       401:
 *         description: Unauthorized or user not found.
 */
router.post('/api/auth/google/disassociate', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const document = await User.findOne({_id: req.user._id}).exec();

  if (document !== null) {
    document.googleId = '';
    document.googleEmail = '';
    await document.save();
  } else {
    res.sendStatus(401);
  }
});

export {router as googleAuthRouter};
