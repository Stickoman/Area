import {v4 as UUID} from 'uuid';
import {IUser, User} from '../model/user';

type OAuthService = 'twitter' | 'facebook' | 'reddit' | 'microsoft' | 'discord' | 'github' | 'google';
type ConnectionType = 'register' | 'login';

interface FlowData {
  step: number;
  service: OAuthService;
  userId: string;
  userName: string;
  connectionType?: ConnectionType;
}

const flows = new Map<string, FlowData>();

function initOAuthFlow(service: OAuthService, userId: string, userName: string): string {
  let uuid = UUID();

  while(flows.has(uuid))
    uuid = UUID();
  flows.set(uuid, {step: 0, service: service, userId: userId, userName: userName});
  return uuid;
}

function retrieveOAuthFlow(id: string): FlowData | null {
  if (flows.has(id))
    return flows.get(id);
  return null;
}

function updateFlow(id: string, flow: FlowData) {
  flows.set(id, flow);
}

async function associateAccount(user: IUser, flow: FlowData) {
  const document = await User.findOne({_id: user._id}).exec();
  if (flow.service == 'twitter')
    document.twitterId = flow.userId;
  if (flow.service == 'facebook')
    document.facebookId = flow.userId;
  if (flow.service == 'reddit')
    document.redditId = flow.userId;
  if (flow.service == 'discord')
    document.discordId = flow.userId;
  if (flow.service == 'github')
    document.githubId = flow.userId;
  if (flow.service == 'microsoft')
    document.microsoftId = flow.userId;
  if (flow.service == 'google') {
    document.googleId = flow.userId;
  }
  await document.save();
}

export type {FlowData};
export {initOAuthFlow, retrieveOAuthFlow, updateFlow, associateAccount};
