import {Router, Response} from 'express';
import {associateAccount, updateFlow} from '../../service/oauthService';
import {oauthFlowMiddleware, OAuthFlowRequest} from '../../middleware/oauthFlow';
import {AuthenticatedRequest, authenticateMiddleware} from '../../middleware/auth';

const router = Router();

interface AuthenticatedOAuthFlowRequest extends AuthenticatedRequest, OAuthFlowRequest {

}

router.get('/api/oauth', oauthFlowMiddleware, async (req: OAuthFlowRequest, res: Response) => {
  res.status(200).send(req.flow);
});

router.post('/api/oauth/associate', [authenticateMiddleware, oauthFlowMiddleware], (req: AuthenticatedOAuthFlowRequest, res: Response) => {
  associateAccount(req.user, req.flow)
    .then(() => res.sendStatus(200))
    .catch(reason => res.status(500).send(reason.message));
});

router.post('/api/oauth/next', oauthFlowMiddleware, async (req: OAuthFlowRequest, res: Response) => {
  const {id, flow} = req;

  if (flow.step === 0)
    flow.connectionType = req.body.data;
  updateFlow(id, {...flow, step: flow.step + 1});
  res.sendStatus(200);
});

router.post('/api/oauth/back', oauthFlowMiddleware, async (req: OAuthFlowRequest, res: Response) => {
  const {id, flow} = req;

  updateFlow(id, {...flow, step: flow.step - 1});
  res.sendStatus(200);
});

export {router as oauthRouter};
