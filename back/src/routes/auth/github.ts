import {AuthenticatedRequest, authenticateMiddleware, generateAccessToken} from '../../middleware/auth';
import {GithubResponse, registerGithubAccount, requestAccessToken} from '../../service/githubService';
import {Request, Response, Router} from 'express';
import {isString, retrieveAssociatedGithub} from '../../service/authService';

import {IGithubAuthentication} from '../../model/githubAuth';
import {User} from '../../model/user';
import {initOAuthFlow} from '../../service/oauthService';

const router = Router();

/**
 * @swagger
 * /api/auth/github:
 *   get:
 *     summary: Initiate GitHub OAuth2 process.
 *     tags:
 *       - OAuth
 *     responses:
 *       302:
 *         description: Redirects to GitHub OAuth2 page.
 *       500:
 *         description: Error initiating GitHub authentication.
 */
router.get('/api/auth/github', [], async (req: Request, res: Response) => {
  try {
    const API_URL = process.env.API_URL;
    const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const REDIRECT_URI = `${API_URL}/auth/github/callback`;
    const SCOPE = 'user';

    res.redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`);
  } catch (error) {
    console.warn('GITHUB OAUTH', error);
    res.status(500).send('Error initiating GitHub auth');
  }
});

/**
 * @swagger
 * /api/auth/github/callback:
 *   get:
 *     summary: Handle GitHub OAuth2 callback.
 *     tags:
 *       - OAuth
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         description: Authorization code returned by GitHub.
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirects to the application
 *       400:
 *         description: Unable to parse authorization code.
 *       500:
 *         description: Error during GitHub callback processing.
 */
router.get('/api/auth/github/callback', [], async (req: Request, res: Response) => {
  const code = req.query.code as string | undefined;

  if (!isString(code)) {
    res.status(400).send('Unable to parse parameter code');
    return;
  }

  try {
    const FRONT_URL = process.env.FRONT_URL;
    const response: GithubResponse = await requestAccessToken(code);
    const account: IGithubAuthentication = await registerGithubAccount(response);
    retrieveAssociatedGithub(account.id)
      .then(async user => {
        const document = await User.findOne({githubId: account.id}).exec();

        document.githubId = account.id;
        await document.save();

        res.redirect(`${FRONT_URL}/login?jwt=${generateAccessToken(user)}&name=${account.screenName}`);
      })
      .catch(() => {
        const id: string = initOAuthFlow('github', account.id, account.screenName);
        res.redirect(`${FRONT_URL}/oauth?id=${id}`);
      });
  } catch (error) {
    res.status(500).send('Error during Github callback processing');
    console.warn(error);
  }
});

/**
 * @swagger
 * /api/auth/github/disassociate:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Disassociate the authenticated user's account from GitHub.
 *     tags:
 *       - OAuth
 *     responses:
 *       200:
 *         description: Successfully disassociated GitHub from the user's account.
 *       401:
 *         description: Unauthorized or user not found.
 */
router.post('/api/auth/github/disassociate', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const document = await User.findOne({_id: req.user._id}).exec();

  if (document !== null) {
    document.githubId = '';
    await document.save();
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

export {router as githubAuthRouter};
