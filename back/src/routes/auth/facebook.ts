import {Router, Response, Request} from 'express';
import {retrieveAssociatedFacebookUser, isString} from '../../service/authService';
import {AuthenticatedRequest, authenticateMiddleware, generateAccessToken} from '../../middleware/auth';
import {User} from '../../model/user';
import qs from 'querystring';
import {initOAuthFlow} from '../../service/oauthService';
import {IFacebookAuthentication} from '../../model/facebookAuth';
import {requestAccessToken, FacebookResponse, registerFacebookAccount} from '../../service/facebookService';

const router = Router();

/**
 * @swagger
 * /api/auth/facebook:
 *   get:
 *     summary: Initiate Facebook OAuth2 process.
 *     tags:
 *       - OAuth
 *     responses:
 *       302:
 *         description: Redirects to Facebook OAuth2 page.
 *       500:
 *         description: Error initiating Facebook authentication.
 */
router.get('/api/auth/facebook', [], async (req: Request, res: Response) => {
  const API_URL = process.env.API_URL;
  const redirectUri = `${API_URL}/auth/facebook/callback`;
  const params = qs.stringify({
    client_id: process.env.FACEBOOK_CLIENT_ID,
    redirect_uri: redirectUri,
  });

  const facebookLoginUrl = `https://www.facebook.com/v18.0/dialog/oauth?${params}`;
  res.redirect(facebookLoginUrl);
});

/**
 * @swagger
 * /api/auth/facebook/callback:
 *   get:
 *     summary: Handle Facebook OAuth2 callback.
 *     tags:
 *       - OAuth
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         description: Authorization code returned by Facebook.
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirects to the application
 *       400:
 *         description: Unable to parse authorization code.
 *       500:
 *         description: Error during Facebook callback processing.
 */
router.get('/api/auth/facebook/callback', [], async (req: Request, res: Response) => {
  const code = req.query.code as string;
  if (!isString(code)) {
    res.status(400).send('Unable to parse parameter code');
    return;
  }
  try {
    const FRONT_URL = process.env.FRONT_URL;
    const response: FacebookResponse = await requestAccessToken(code);
    const account: IFacebookAuthentication = await registerFacebookAccount(response);

    retrieveAssociatedFacebookUser(account.userId)
      .then(async user => {
        const document = await User.findOne({facebookId: account.userId}).exec();

        document.facebookId = account.userId;
        await document.save();

        res.redirect(`${FRONT_URL}/login?jwt=${generateAccessToken(user)}&name=${account.screenName}`);
      })
      .catch(() => {
        const id: string = initOAuthFlow('facebook', account.userId, account.screenName);

        res.redirect(`${FRONT_URL}/oauth?id=${id}`);
      });
  } catch (error) {
    console.error('Error during requestAccessToken:', error);
    res.status(500).send('Error during Facebook callback processing');
  }
});

/**
 * @swagger
 * /api/auth/facebook/disassociate:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Disassociate the authenticated user's account from Facebook.
 *     tags:
 *       - OAuth
 *     responses:
 *       200:
 *         description: Successfully disassociated Facebook from the user's account.
 *       401:
 *         description: Unauthorized or user not found.
 */
router.post('/api/auth/facebook/disassociate', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const document = await User.findOne({_id: req.user._id}).exec();

  if (document !== null) {
    document.facebookId = '';
    await document.save();
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

export {router as facebookAuthRouter};
