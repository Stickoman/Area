import {IUser} from '../model/user';
import {JwtPayload, sign, verify} from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

interface AuthenticatedRequest extends Request {
  token: string | JwtPayload;
}

function generateAccessToken(user: IUser): string {
  return sign({user: user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1800s'});
}

function authenticateMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.headers['authorization'];
  const token = header?.split(' ')[1];

  if (!header.startsWith('Bearer ') || !token)
    return res.sendStatus(401);

  verify(token, process.env.ACCESS_TOKEN_SECRET, (hasError, jwt) => {
    if (hasError)
      return res.sendStatus(401);
    req.token = jwt;
    next();
  });
}

export {generateAccessToken, authenticateMiddleware};
