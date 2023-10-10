import {Router, Response, Request} from 'express';
import {isString, retrieveAssociatedTwitterUser} from '../../service/authService';
import {registerTwitterAccount, requestAccessToken, requestToken, TwitterResponse} from '../../service/twitterService';
import {ITwitterAuthentication} from '../../model/twitterAuth';
import {User} from '../../model/user';
import {AuthenticatedRequest, authenticateMiddleware, generateAccessToken} from '../../middleware/auth';
import {initOAuthFlow} from '../../service/oauthService';

const router = Router();

router.get('/api/auth/twitter', [], async (req: Request, res: Response) => {
  try {
    const token: string = await requestToken();

    res.redirect(`https://api.twitter.com/oauth/authenticate?oauth_token=${token}`);
  } catch (error) {
    console.warn('TWITTER OAUTH', error);
    res.status(500).send('Error initiating Twitter auth');
  }
});

router.get('/api/auth/twitter/callback', [], async (req: Request, res: Response) => {
  const oauth_token = req.query.oauth_token as string | undefined;
  const oauth_verifier = req.query.oauth_verifier as string | undefined;

  if (!isString(oauth_token) || !isString(oauth_verifier)) {
    res.status(400).send('Unable to parse parameters oauth_token and oauth_verifier');
    return;
  }

  try {
    const response: TwitterResponse = await requestAccessToken(oauth_token, oauth_verifier);
    const account: ITwitterAuthentication = await registerTwitterAccount(response);

    retrieveAssociatedTwitterUser(account.userId)
      .then(async user => {
        const document = await User.findOne({twitterId: account.userId}).exec();

        document.twitterId = account.userId;
        await document.save();

        res.redirect(`http://localhost:3000/login?jwt=${generateAccessToken(user)}&name=${account.screenName}`);
      })
      .catch(() => {
        const id: string = initOAuthFlow('twitter', account.userId, account.screenName);

        res.redirect(`http://localhost:3000/oauth?id=${id}`);
      });
  } catch (error) {
    res.status(500).send('Error during Twitter callback processing');
  }
});

router.post('/api/auth/twitter/disassociate', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const document = await User.findOne({_id: req.user._id}).exec();

  if (document !== null) {
    document.twitterId = '';
    await document.save();
  } else {
    res.sendStatus(401);
  }
});

export {router as twitterAuthRouter};
