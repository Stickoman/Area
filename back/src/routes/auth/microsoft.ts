import {AuthenticatedRequest, authenticateMiddleware, generateAccessToken} from '../../middleware/auth';
import {User} from '../../model/user';
import {MicrosoftResponse, registerMicrosoftAccount, requestAccessToken} from '../../service/microsoftService';
import {Request, Response, Router} from 'express';
import {isString, retrieveAssociatedMicrosoft} from '../../service/authService';
import {IMicrosoftAuthentication} from '../../model/microsoftAuth';
import {initOAuthFlow} from '../../service/oauthService';

const router = Router();

/**
 * @swagger
 * /api/auth/microsoft:
 *   get:
 *     summary: Initiate Microsoft OAuth2 process.
 *     tags:
 *       - OAuth
 *     responses:
 *       302:
 *         description: Redirects to Microsoft OAuth2 page.
 *       500:
 *         description: Error initiating Microsoft authentication.
 */
router.get('/api/auth/microsoft', [], async (req: Request, res: Response) => {
  try {
    const REDIRECT_URI = `${process.env.API_URL}/auth/microsoft/callback`;
    const CLIENT_ID = process.env.MICROSOFT_CLIENT_ID;
    const SCOPE = 'openid User.Read Mail.Read';

    res.redirect(`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=code`);
  } catch (error) {
    console.warn('MICROSOFT OAUTH', error);
    res.status(500).send('Error initiating Microsoft auth');
  }
});

/**
 * @swagger
 * /api/auth/microsoft/callback:
 *   get:
 *     summary: Handle Microsoft OAuth2 callback.
 *     tags:
 *       - OAuth
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         description: Authorization code returned by Microsoft.
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirects to the application
 *       400:
 *         description: Unable to parse authorization code.
 *       500:
 *         description: Error during Microsoft callback processing.
 */
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

        res.redirect(`${process.env.FRONT_URL}/login?jwt=${generateAccessToken(user)}&name=${account.screenName}`);
      })
      .catch(() => {
        const id: string = initOAuthFlow('microsoft', account.id, account.screenName);
        res.redirect(`${process.env.FRONT_URL}/oauth?id=${id}`);
      });
  } catch (error) {
    res.status(500).send('Error during Microsoft callback processing');
    console.warn(error);
  }
});

/**
 * @swagger
 * /api/auth/microsoft/disassociate:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Disassociate the authenticated user's account from Microsoft.
 *     tags:
 *       - OAuth
 *     responses:
 *       200:
 *         description: Successfully disassociated Microsoft from the user's account.
 *       401:
 *         description: Unauthorized or user not found.
 */
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
