import {Router, Response, Request} from 'express';
import {retrieveAssociatedFacebookUser} from '../../service/authService';
import {AuthenticatedRequest, authenticateMiddleware, generateAccessToken} from '../../middleware/auth';
import {User} from '../../model/user';
import qs from 'querystring';
import axios from 'axios'
import {initOAuthFlow} from '../../service/oauthService';
import { IFacebookAuthentication } from '../../model/facebookAuth';
import { requestAccessToken, FacebookResponse, registerFacebookAccount } from '../../service/facebookService';

const router = Router();
const redirectUri = 'http://localhost:8080/api/auth/facebook/callback';

router.get('/api/auth/facebook', [], async (req: Request, res: Response) => {
    const params = qs.stringify({
        client_id: process.env.FACEBOOK_CLIENT_ID,
        redirect_uri: redirectUri,
    });
    
    const facebookLoginUrl = `https://www.facebook.com/v18.0/dialog/oauth?${params}`;
    res.redirect(facebookLoginUrl);
});

router.get('/api/auth/facebook/callback', [], async (req: Request, res: Response) => {
  const code = req.query.code as string;
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

router.post('/api/auth/facebook/disassociate', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const document = await User.findOne({_id: req.user._id}).exec();

  if (document !== null) {
    document.facebookId = '';
    await document.save();
  } else {
    res.sendStatus(401);
  }
});

export {router as facebookAuthRouter};
