import {NextFunction, Request, Response} from 'express';
import {isString} from '../service/authService';
import {FlowData, retrieveOAuthFlow} from '../service/oauthService';

interface OAuthFlowRequest extends Request {
  id: string;
  flow: FlowData;
}

function oauthFlowMiddleware(req: OAuthFlowRequest, res: Response, next: NextFunction) {
  if (!req.query.id || !isString(req.query.id)) {
    res.status(400).send('Missing OAuth flow id');
    return;
  }
  const id: string = req.query.id;
  const flow = retrieveOAuthFlow(id);

  if (flow !== null) {
    req.id = id;
    req.flow = flow;
    next();
  } else {
    res.status(404).send('Unable to find flow');
  }
}

export {OAuthFlowRequest, oauthFlowMiddleware};
