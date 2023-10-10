type OAuthService = 'twitter' | 'facebook' | 'microsoft';

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

export type {OAuthService, FlowData, FlowProps};
export {serviceColor};
