import {Router, Response, Request} from 'express';
import {isString} from '../../service/authService';
import {requestAccessToken, requestToken, TwitterResponse} from '../../service/twitterService';

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

  if (!isString(oauth_token) || !isString(oauth_verifier)) return;

  try {
    const response: TwitterResponse = await requestAccessToken(oauth_token, oauth_verifier);

    console.log(response);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error during Twitter callback processing');
  }
});

export {router as twitterAuthRouter};
