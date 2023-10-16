import {Router, Response, Request} from 'express';
import {isString} from '../../service/authService';
import {DiscordResponse, registerDiscordAccount, requestAccessToken} from '../../service/discordService';
import {IUser} from '../../model/user';
import {model} from 'mongoose';

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
    await registerDiscordAccount(response);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send('Error during Discord callback processing');
  }
});

export {router as discordAuthRouter};
