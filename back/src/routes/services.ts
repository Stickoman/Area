import express, {Response} from 'express';
import {AuthenticatedRequest, authenticateMiddleware} from '../middleware/auth';
import {isString} from '../service/authService';
import {retrieveFeedUpdates} from '../adapter/redditRssAdapter';
import {retrieveEmailsUpdates} from '../adapter/googleEmailsAdapter';

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

router.get('/api/services/emails', authenticateMiddleware, (req: AuthenticatedRequest, res: Response) => {
  retrieveEmailsUpdates(req.user._id)
    .then(feed => {
      res.status(200)
        .json(feed);
    })
    .catch(reason => {
      return res.status(500)
        .json({message: reason.toString()});
    });
});

export {router as servicesRouter};
