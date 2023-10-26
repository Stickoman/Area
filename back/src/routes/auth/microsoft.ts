import {AuthenticatedRequest, authenticateMiddleware, generateAccessToken} from '../../middleware/auth';
import {IUser, User} from '../../model/user';
import {MicrosoftResponse, registerMicrosoftAccount, requestAccessToken} from '../../service/microsoftService';
import {Request, Response, Router} from 'express';
import {isString, retrieveAssociatedMicrosoft} from '../../service/authService';

import {IMicrosoftAuthentication} from '../../model/microsoftAuth';
import {initOAuthFlow} from '../../service/oauthService';
import {model} from 'mongoose';

const router = Router();

router.get('/api/auth/microsoft', [], async (req: Request, res: Response) => {
  try {
    //const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const REDIRECT_URI = 'http://localhost:8080/api/auth/microsoft/callback';
    const CLIENT_ID = '8562c76e-ef8d-4f37-93aa-f02b7311bc26';
    const SCOPE = 'openid User.Read Mail.Read';

    res.redirect(`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=code`);
  } catch (error) {
    console.warn('MICROSOFT OAUTH', error);
    res.status(500).send('Error initiating Microsoft auth');
  }
});

router.get('/api/auth/microsoft/callback', [], async (req: Request, res: Response) => {
  const code = req.query.code as string | undefined;
  if (!isString(code)) {
    res.status(400).send('Unable to parse parameter code');
    return;
  }

  try {
    const response: MicrosoftResponse = await requestAccessToken(code);
    const account: IMicrosoftAuthentication = await registerMicrosoftAccount(response);
    retrieveAssociatedMicrosoft(account.id)
      .then(async user => {
        const document = await User.findOne({microsoftId: account.id}).exec();

        document.microsoftId = account.id;
        await document.save();

        res.redirect(`http://localhost:8081/login?jwt=${generateAccessToken(user)}&name=${account.screenName}`);
      })
      .catch(() => {
        const id: string = initOAuthFlow('microsoft', account.id, account.screenName);
        res.redirect(`http://localhost:8081/oauth?id=${id}`);
      });
  } catch (error) {
    res.status(500).send('Error during Microsoft callback processing');
    console.warn(error);
  }
});

router.post('/api/auth/microsoft/disassociate', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const document = await User.findOne({_id: req.user._id}).exec();

  if (document !== null) {
    document.microsoftId = '';
    await document.save();
  } else {
    res.sendStatus(401);
  }
});

export {router as microsoftAuthRouter};