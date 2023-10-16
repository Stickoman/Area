import {Router, Response, Request} from 'express';
import {isString, retrieveAssociatedDiscord} from '../../service/authService';
import {DiscordResponse, registerDiscordAccount, requestAccessToken} from '../../service/discordService';
import {IUser, User} from '../../model/user';
import {model} from 'mongoose';
import {ITwitterAuthentication} from '../../model/twitterAuth';
import {IDiscordAuthentication} from '../../model/discordAuth';
import {AuthenticatedRequest, authenticateMiddleware, generateAccessToken} from '../../middleware/auth';
import {initOAuthFlow} from '../../service/oauthService';

const router = Router();
const user = model<IUser>('User');

router.get('/api/auth/discord', [], async (req: Request, res: Response) => {
  try {
    const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
    const REDIRECT_URI = 'http://localhost:8080/api/auth/discord/callback';
    const SCOPE = 'identify';

    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`);
  } catch (error) {
    console.warn('DISCORD OAUTH', error);
    res.status(500).send('Error initiating Discord auth');
  }
});

router.get('/api/auth/discord/callback', [], async (req: Request, res: Response) => {
  const code = req.query.code as string | undefined;

  if (!isString(code)) {
    res.status(400).send('Unable to parse parameter code');
    return;
  }

  try {
    const response: DiscordResponse = await requestAccessToken(code);
    const account: IDiscordAuthentication = await registerDiscordAccount(response);
    retrieveAssociatedDiscord(account.id)
      .then(async user => {
        const document = await User.findOne({discordId: account.id}).exec();

        document.discordId = account.id;
        await document.save();

        res.redirect(`http://localhost:8081/login?jwt=${generateAccessToken(user)}&name=${account.screenName}`);
      })
      .catch(() => {
        const id: string = initOAuthFlow('discord', account.id, account.screenName);
        res.redirect(`http://localhost:8081/oauth?id=${id}`);
      });
  } catch (error) {
    res.status(500).send('Error during Discord callback processing');
    console.warn(error);
  }
});

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
