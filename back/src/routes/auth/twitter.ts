import {Router, Response, Request} from 'express';
import axios from 'axios';
import qs from 'querystring';
import {isString} from '../../service/authService';
import oAuth1a from 'twitter-v1-oauth';

const router = Router();
const CONSUMER_KEY = 'LXhOVDkwR0FYbjBROWloZkRtNDU6MTpjaQ';
const CONSUMER_SECRET = 'iCrmablHnSyw5_c2ioaw5thb0CKugWzbPfoYNe9jvsqaJ88Oqt';
const CALLBACK_URL = 'http://localhost:8080/api/auth/twitter/callback';

const oAuthOptions = {
  api_key: process.env.TWITTER_API_KEY || "HSljaPPH469eKLYOkicfr7ynF",
  api_secret_key: process.env.TWITTER_API_SECRET_KEY || "8P4ZVXN38OpXIU9q013Gz7ZwgdrzDaGA7PvqCE6noLruIzb9tA",
  access_token: process.env.TWITTER_ACCESS_TOKEN || "3347689185-vbQnrSQJNo28HLThgsCQKDwwXSHoAv40gZGeKTI",
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || "7jOfsprUOXfUMwppUNXY4Bzc8xw6L6WXhHAnpaPKxbeHq",
};
const url = "https://api.twitter.com/oauth/request_token";
const method = "POST";
const params = { oauth_callback: CALLBACK_URL };

const authorization = oAuth1a({ method, url, params }, oAuthOptions);

router.get('/api/auth/twitter', [], async (req: Request, res: Response) => {
  try {
    const response = await axios.post(url, qs.stringify(params), {
      headers: {
        authorization,
      },
    });

    const oauthData = qs.parse(response.data);

    if (typeof oauthData.oauth_token === 'string') {
      res.redirect(`https://api.twitter.com/oauth/authenticate?oauth_token=${oauthData.oauth_token}`);
    } else {
      throw new Error('Invalid oauth_token');
    }
  } catch (error) {
    console.warn('request', error, error.response.data);
    res.status(500).send('Error initiating Twitter auth');
  }
});

router.get('/api/auth/twitter/callback', [], async (req: Request, res: Response) => {
  const oauth_token = req.query.oauth_token as string | undefined;
  const oauth_verifier = req.query.oauth_verifier as string | undefined;

  if (!isString(oauth_token) || !isString(oauth_verifier)) return;

  const request_data = {
    url: 'https://api.twitter.com/oauth/access_token',
    method: 'POST',
    data: {
      oauth_token,
      oauth_verifier,
    },
  };

  try {
    const response = await axios.post(request_data.url, qs.stringify(request_data.data), {
      headers: {
        authorization,
      },
    });

    const authData = qs.parse(response.data);
    console.log(authData);

    res.redirect('/');
  } catch (error) {
    console.warn('callback', error);
    res.status(500).send('Error during Twitter callback processing');
  }
});

export {router as twitterAuthRouter};
