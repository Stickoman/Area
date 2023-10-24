import {Router, Response, Request} from 'express';
import {isString, retrieveAssociatedGoogle} from '../../service/authService';
import {GoogleResponse, registerGoogleAccount, requestAccessToken} from '../../service/googleService';
import {IUser, User} from '../../model/user';
import {IGoogleAuthentication} from '../../model/googleAuth';
import {AuthenticatedRequest, authenticateMiddleware, generateAccessToken} from '../../middleware/auth';
import {initOAuthFlow} from '../../service/oauthService';

const router = Router();

router.get('/api/auth/google', [], async (req: Request, res: Response) => {
  try {
    const API_URL = process.env.API_URL;
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const REDIRECT_URI = `${API_URL}/auth/google/callback`;
    const SCOPE = 'profile email';

    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`);
  } catch (error) {
    console.warn('GOOGLE OAUTH', error);
    res.status(500).send('Error initiating Google auth');
  }
});


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
        await document.save();

        res.redirect(`${FRONT_URL}/login?jwt=${generateAccessToken(user)}&name=${account.screenName}`);
      })
      .catch(() => {
        const id: string = initOAuthFlow('google', account.id, account.screenName);
        res.redirect(`${FRONT_URL}/oauth?id=${id}`);
      });
  } catch (error) {
    res.status(500).send('Error during Google callback processing');
    console.warn(error);
  }
});

router.post('/api/auth/Google/disassociate', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const document = await User.findOne({_id: req.user._id}).exec();

  if (document !== null) {
    document.googleId = '';
    await document.save();
  } else {
    res.sendStatus(401);
  }
});

export {router as googleAuthRouter};
