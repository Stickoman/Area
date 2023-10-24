import {Router, Response, Request} from 'express';
import {isString, retrieveAssociatedGithub} from '../../service/authService';
import {GithubResponse, registerGithubAccount, requestAccessToken} from '../../service/githubService';
import {User} from '../../model/user';
import {IGithubAuthentication} from '../../model/githubAuth';
import {AuthenticatedRequest, authenticateMiddleware, generateAccessToken} from '../../middleware/auth';
import {initOAuthFlow} from '../../service/oauthService';

const router = Router();

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

router.post('/api/auth/github/disassociate', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const document = await User.findOne({_id: req.user._id}).exec();

  if (document !== null) {
    document.githubId = '';
    await document.save();
  } else {
    res.sendStatus(401);
  }
});

export {router as githubAuthRouter};
