import {AuthenticatedRequest, authenticateMiddleware} from '../middleware/auth';
import express, {Response} from 'express';

import {GoogleAuthentication} from '../model/googleAuth';
import checkForNewEmails from '../service/google/checkNewEmails';
import {googleAuthRouter} from './auth/google';
import {isString} from '../service/authService';
import {retrieveFeedUpdates} from '../adapter/redditRssAdapter';
import sendEmailToMyself from '../service/google/emailService';
import sendMicrosoftEmailToMyself from '../service/microsoft/microsoftEmailService';
import teamsMessageService from '../service/microsoft/teamsMessageService';
import {updateUserProfile} from '../service/profileService';

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
    const data = req.body;
    if (data.subject && data.message) {
      await sendEmailToMyself(data.subject, data.message, req.user.googleId);
      res.sendStatus(200);
    } else {
      const missingProperties = ['subject', 'message']
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
    const googleEmail = GoogleAuth.email;
    await checkForNewEmails(GoogleAuth.access_token, googleEmail);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error send email', error);
    res.sendStatus(500);
  }
});

router.post('/api/services/emailMicrosoft', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = req.body;
    if (data.subject && data.message) {
      await sendMicrosoftEmailToMyself(data.subject, data.message, req.user.microsoftId);
      res.sendStatus(200);
    } else {
      const missingProperties = ['subject', 'message']
        .filter(prop => !data[prop])
        .join(', ');

      res.status(400).json({message: `Missing ${missingProperties} in body`});
    }
  } catch (error) {
    console.error('Error send email', error);
    res.sendStatus(500);
  }
});

// router.post('/api/services/messageTeams', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
//   try {
//     const data = req.body;
//     if (data.subject && data.message) {
//       await teamsMessageService(data.subject, data.message, req.user.microsoftId);
//       res.sendStatus(200);
//     } else {
//       const missingProperties = ['subject', 'message']
//         .filter(prop => !data[prop])
//         .join(', ');

//       res.status(400).json({message: `Missing ${missingProperties} in body`});
//     }
//   } catch (error) {
//     console.error('Error send email', error);
//     res.sendStatus(500);
//   }
// });


export {router as servicesRouter};
