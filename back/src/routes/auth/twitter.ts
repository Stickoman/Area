import {Router, Response, Request} from 'express';
import {isString, retrieveAssociatedTwitterUser} from '../../service/authService';
import {registerTwitterAccount, requestAccessToken, requestToken, TwitterResponse} from '../../service/twitterService';
import {ITwitterAuthentication} from '../../model/twitterAuth';
import {User} from '../../model/user';
import {AuthenticatedRequest, authenticateMiddleware, generateAccessToken} from '../../middleware/auth';
import {initOAuthFlow} from '../../service/oauthService';

const router = Router();

/**
 * @swagger
 * /api/auth/twitter:
 *   get:
 *     summary: Initiate Twitter OAuth2 process.
 *     tags:
 *       - OAuth
 *     responses:
 *       302:
 *         description: Redirects to Twitter OAuth2 page.
 *       500:
 *         description: Error initiating Twitter authentication.
 */
router.get('/api/auth/twitter', [], async (req: Request, res: Response) => {
  try {
    const token: string = await requestToken();

    res.redirect(`https://api.twitter.com/oauth/authenticate?oauth_token=${token}`);
  } catch (error) {
    console.warn('TWITTER OAUTH', error);
    res.status(500).send('Error initiating Twitter auth');
  }
});

/**
 * @swagger
 * /api/auth/twitter/callback:
 *   get:
 *     summary: Handle Twitter OAuth2 callback.
 *     tags:
 *       - OAuth
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         description: Authorization code returned by Twitter.
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirects to the application
 *       400:
 *         description: Unable to parse authorization code.
 *       500:
 *         description: Error during Twitter callback processing.
 */
router.get('/api/auth/twitter/callback', [], async (req: Request, res: Response) => {
  const oauth_token = req.query.oauth_token as string | undefined;
  const oauth_verifier = req.query.oauth_verifier as string | undefined;

  if (!isString(oauth_token) || !isString(oauth_verifier)) {
    res.status(400).send('Unable to parse parameters oauth_token and oauth_verifier');
    return;
  }

  try {
    const FRONT_URL = process.env.FRONT_URL;
    const response: TwitterResponse = await requestAccessToken(oauth_token, oauth_verifier);
    const account: ITwitterAuthentication = await registerTwitterAccount(response);

    retrieveAssociatedTwitterUser(account.userId)
      .then(async user => {
        const document = await User.findOne({twitterId: account.userId}).exec();

        document.twitterId = account.userId;
        await document.save();

        res.redirect(`${FRONT_URL}/login?jwt=${generateAccessToken(user)}&name=${account.screenName}`);
      })
      .catch(() => {
        const id: string = initOAuthFlow('twitter', account.userId, account.screenName);

        res.redirect(`${FRONT_URL}/oauth?id=${id}`);
      });
  } catch (error) {
    res.status(500).send('Error during Twitter callback processing');
  }
});

/**
 * @swagger
 * /api/auth/twitter/disassociate:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Disassociate the authenticated user's account from Twitter.
 *     tags:
 *       - OAuth
 *     responses:
 *       200:
 *         description: Successfully disassociated Twitter from the user's account.
 *       401:
 *         description: Unauthorized or user not found.
 */
router.post('/api/auth/twitter/disassociate', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const document = await User.findOne({_id: req.user._id}).exec();

  if (document !== null) {
    document.twitterId = '';
    await document.save();
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

export {router as twitterAuthRouter};
