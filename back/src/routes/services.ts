import express, {Response} from 'express';
import {AuthenticatedRequest, authenticateMiddleware} from '../middleware/auth';
import {isString} from '../service/authService';
import {retrieveFeedUpdates} from '../adapter/redditRssAdapter';
import {updateUserProfile} from '../service/profileService';
import {GoogleAuthentication} from '../model/googleAuth';
import sendEmailToMyself from '../service/google/emailService';
import {googleAuthRouter} from './auth/google';
import checkForNewEmails from '../service/google/checkNewEmails';

const router = express.Router();

router.get('/api/services/reddit', authenticateMiddleware, (req: AuthenticatedRequest, res: Response) => {
  if (!req.query['url'] || !isString(req.query['url'])) {
    return res.status(400)
      .json({message: 'Missing URL parameter'});
  }

  retrieveFeedUpdates(req.user._id, req.query['url'])
    .then(feed => {
      res.status(200)
        .json(feed);
    })
    .catch(reason => {
      return res.status(500)
        .json({message: reason.toString()});
    });
});


router.post('/api/services/email', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userGoogleID = req.user.googleId;
    const data = req.body;
    let GoogleAuth = await GoogleAuthentication.findOne({id: userGoogleID}).exec();
    if (data.subject && data.message && data.email) {
      await sendEmailToMyself(GoogleAuth.access_token, data.subject, data.message, data.email);
      res.sendStatus(200);
    } else {
      const missingProperties = ['subject', 'message', 'email']
        .filter(prop => !data[prop])
        .join(', ');

      res.status(400).json({message: `Missing ${missingProperties} in body`});
    }
  } catch (error) {
    console.error('Error send email', error);
    res.sendStatus(500);
  }
});

router.post('/api/services/get/email', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userGoogleID = req.user.googleId;
    let GoogleAuth = await GoogleAuthentication.findOne({id: userGoogleID}).exec();
    await checkForNewEmails(GoogleAuth.access_token, req.user.googleEmail);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error send email', error);
    res.sendStatus(500);
  }
});

export {router as servicesRouter};
