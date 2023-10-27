import {Router, Response, Request} from 'express';
import {isString, retrieveAssociatedDiscord} from '../../service/authService';
import {DiscordResponse, registerDiscordAccount, requestAccessToken} from '../../service/discordService';
import {User} from '../../model/user';
import {IDiscordAuthentication} from '../../model/discordAuth';
import {AuthenticatedRequest, authenticateMiddleware, generateAccessToken} from '../../middleware/auth';
import {initOAuthFlow} from '../../service/oauthService';

const router = Router();

/**
 * @swagger
 * /api/auth/discord:
 *   get:
 *     summary: Initiate Discord OAuth2 process.
 *     tags:
 *       - OAuth
 *     responses:
 *       302:
 *         description: Redirects to Discord OAuth2 page.
 *       500:
 *         description: Error initiating Discord authentication.
 */
router.get('/api/auth/discord', [], async (req: Request, res: Response) => {
  try {
    const API_URL = process.env.API_URL;
    const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
    const REDIRECT_URI = `${API_URL}/auth/discord/callback`;
    const SCOPE = 'identify';

    console.log(REDIRECT_URI);
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`);
  } catch (error) {
    console.warn('DISCORD OAUTH', error);
    res.status(500).send('Error initiating Discord auth');
  }
});

/**
 * @swagger
 * /api/auth/discord/callback:
 *   get:
 *     summary: Handle Discord OAuth2 callback.
 *     tags:
 *       - OAuth
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         description: Authorization code returned by Discord.
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirects to the application
 *       400:
 *         description: Unable to parse authorization code.
 *       500:
 *         description: Error during Discord callback processing.
 */
router.get('/api/auth/discord/callback', [], async (req: Request, res: Response) => {
  const code = req.query.code as string | undefined;

  if (!isString(code)) {
    res.status(400).send('Unable to parse parameter code');
    return;
  }

  try {
    const FRONT_URL = process.env.FRONT_URL;
    const response: DiscordResponse = await requestAccessToken(code);
    const account: IDiscordAuthentication = await registerDiscordAccount(response);
    retrieveAssociatedDiscord(account.id)
      .then(async user => {
        const document = await User.findOne({discordId: account.id}).exec();

        document.discordId = account.id;
        await document.save();

        res.redirect(`${FRONT_URL}/login?jwt=${generateAccessToken(user)}&name=${account.screenName}`);
      })
      .catch(() => {
        const id: string = initOAuthFlow('discord', account.id, account.screenName);
        res.redirect(`${FRONT_URL}/oauth?id=${id}`);
      });
  } catch (error) {
    res.status(500).send('Error during Discord callback processing');
    console.warn(error);
  }
});

/**
 * @swagger
 * /api/auth/discord/disassociate:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Disassociate the authenticated user's account from Discord.
 *     tags:
 *       - OAuth
 *     responses:
 *       200:
 *         description: Successfully disassociated Discord from the user's account.
 *       401:
 *         description: Unauthorized or user not found.
 */
router.post('/api/auth/discord/disassociate', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const document = await User.findOne({_id: req.user._id}).exec();

  if (document !== null) {
    document.discordId = '';
    await document.save();
  } else {
    res.sendStatus(401);
  }
});

export {router as discordAuthRouter};
