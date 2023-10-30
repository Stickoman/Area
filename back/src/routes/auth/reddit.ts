import {Router, Response, Request} from 'express';
import {AuthenticatedRequest, authenticateMiddleware, generateAccessToken} from '../../middleware/auth';
import {User} from '../../model/user';
import {initOAuthFlow} from '../../service/oauthService';
import {RedditResponse, registerRedditAccount, requestAccessToken} from '../../service/redditService';
import {retrieveAssociatedRedditUser} from '../../service/authService';

const router = Router();

/**
 * @swagger
 * /api/auth/reddit:
 *   get:
 *     summary: Initiate Reddit OAuth2 process.
 *     tags:
 *       - OAuth
 *     responses:
 *       302:
 *         description: Redirects to Reddit OAuth2 page.
 *       500:
 *         description: Error initiating Reddit authentication.
 */
router.get('/api/auth/reddit', [], async (req: Request, res: Response) => {
  const authorizationUrl = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_CLIENT_ID}&response_type=code&state=random_state&redirect_uri=${process.env.API_URL}/auth/reddit/callback&duration=permanent&scope=identity`;

  res.redirect(authorizationUrl);
});

/**
 * @swagger
 * /api/auth/reddit/callback:
 *   get:
 *     summary: Handle Reddit OAuth2 callback.
 *     tags:
 *       - OAuth
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         description: Authorization code returned by Reddit.
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirects to the application
 *       400:
 *         description: Unable to parse authorization code.
 *       500:
 *         description: Error during Reddit callback processing.
 */
router.get('/api/auth/reddit/callback', [], async (req: Request, res: Response) => {
  const code = req.query.code as string;
  try {
    const FRONT_URL = process.env.FRONT_URL;
    const response: RedditResponse = await requestAccessToken(code);
    const account = await registerRedditAccount(response);

    retrieveAssociatedRedditUser(account.userId)
      .then(async user => {
        const document = await User.findOne({redditId: account.userId}).exec();

        document.redditId = account.userId;
        await document.save();

        res.redirect(`${FRONT_URL}/login?jwt=${generateAccessToken(user)}&name=${account.screenName}`);
      })
      .catch(() => {
        const id: string = initOAuthFlow('reddit', account.userId, account.screenName);

        res.redirect(`${FRONT_URL}/oauth?id=${id}`);
      });
  } catch (error) {
    res.status(500).send('Error during Reddit callback processing');
  }
});

router.post('/api/auth/reddit/disassociate', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
    const document = await User.findOne({_id: req.user._id}).exec();

    if (document !== null) {
      document.redditId = '';
      await document.save();
    } else {
      res.sendStatus(401);
    }
  });

export {router as redditAuthRouter};
