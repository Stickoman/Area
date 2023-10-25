import {Router, Response, Request} from 'express';
import {AuthenticatedRequest, authenticateMiddleware, generateAccessToken} from '../../middleware/auth';
import {User} from '../../model/user';
import qs from 'querystring';
import axios from 'axios'
import {initOAuthFlow} from '../../service/oauthService';
import { RedditResponse, registerRedditAccount, requestAccessToken } from '../../service/redditService';
import { IRedditAuthentication } from '../../model/redditAuth';
import { retrieveAssociatedRedditUser } from '../../service/authService';

const router = Router();
const redirectUri = 'http://localhost:8080/api/auth/reddit/callback';

router.get('/api/auth/reddit', [], async (req: Request, res: Response) => {
    const authorizationUrl = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_CLIENT_ID}&response_type=code&state=random_state&redirect_uri=${redirectUri}&duration=permanent&scope=identity`

    res.redirect(authorizationUrl);
});

router.get('/api/auth/reddit/callback', [], async (req: Request, res: Response) => {
    const code = req.query.code as string;
    try {
        const FRONT_URL = process.env.FRONT_URL;
        const response: RedditResponse = await requestAccessToken(code);
        const account = await registerRedditAccount(response);
        
        retrieveAssociatedRedditUser(account.userId)
        .then(async user => {
            const document = await User.findOne({redditId: account.userId}).exec();

            document.redditId = account.userId;
            await document.save();

            res.redirect(`${FRONT_URL}/login?jwt=${generateAccessToken(user)}&name=${account.screenName}`);
          })
        .catch(() => {
            const id: string = initOAuthFlow('reddit', account.userId, account.screenName);

            res.redirect(`${FRONT_URL}/oauth?id=${id}`);
        });
    } catch (error) {
        res.status(500).send('Error during Reddit callback processing');
    }
});

export {router as redditAuthRouter};
