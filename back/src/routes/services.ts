import express, {Request, Response} from 'express';
import {AuthenticatedRequest, authenticateMiddleware} from '../middleware/auth';
import {isString} from '../service/authService';
import {retrieveFeedUpdates} from '../service/rssService';

const router = express.Router();

router.get('/api/services', [], (req: Request, res: Response) => {
  return res.send('services');
});

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

router.get('/api/services/timer', [], (req: Request, res: Response) => {
  try {
    const currentDate = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    const currentTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    res.json({ currentDate, currentTime });
  } catch (error) {
    return res.status(500)
      .json({message: 'Server Error'});
  }
});

export {router as servicesRouter};
