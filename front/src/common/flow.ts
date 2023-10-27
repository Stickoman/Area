type OAuthService = 'twitter' | 'facebook' | 'microsoft' | 'google' | 'reddit' | 'github' | 'discord';

type ConnectionType = 'login' | 'register';

interface FlowData {
  step: number;
  service: OAuthService;
  userName: string;
  connectionType?: ConnectionType;
}

interface FlowProps {
  id: string;
  flow: FlowData;
  refreshFlow: (none: void) => void;
}

const serviceColor = new Map<OAuthService, string>();

serviceColor.set('twitter', '#1c9cea');
serviceColor.set('facebook', '#1f91ff');
serviceColor.set('microsoft', '#f3582c');
serviceColor.set('google', '#ff0000');
serviceColor.set('reddit', '#ff5536');
serviceColor.set('github', '#2a2a2a');
serviceColor.set('discord', '#7289da');

export type {OAuthService, FlowData, FlowProps};
export {serviceColor};
