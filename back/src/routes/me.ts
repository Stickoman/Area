import express, {Request , Response} from 'express';

const router = express.Router()

router.get('/api/me', [], (req: Request, res: Response) => {
  return res.send('me')
})

export { router as meRouter }
