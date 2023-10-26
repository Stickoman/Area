import {IMicrosoftAuthentication, MicrosoftAuthentication} from '../model/microsoftAuth';

import axios from 'axios';
import qs from 'querystring';

interface MicrosoftResponse {
  token_type: string;
  access_token: string;
  scope: string;
}

async function requestAccessToken(code: string): Promise<MicrosoftResponse> {
  const CLIENT_ID = '8562c76e-ef8d-4f37-93aa-f02b7311bc26';
  const CLIENT_SECRET = 'C-A8Q~0mNHVpj5XmYaixBeaQXE2RflmJB9EdwaAD';
  const CALLBACK_URL = 'http://localhost:8080/api/auth/microsoft/callback';

  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: 'openid User.Read Mail.Read',
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: CALLBACK_URL,
  };

  return axios.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(response => {
    return response.data as MicrosoftResponse;
  });
}

async function registerMicrosoftAccount(response: MicrosoftResponse): Promise<IMicrosoftAuthentication> {
  try {
    console.log('response', response.access_token);
    const idResponse = await axios.get('https://graph.microsoft.com/v1.0/me', {
      headers: {
        'Authorization': `Bearer ${response.access_token}`,
      },
    });
    const id = idResponse.data.id;
    const screenName = idResponse.data.displayName;
    let microsoftAuth = await MicrosoftAuthentication.findOne({id}).exec();
    if (microsoftAuth === null) {
      microsoftAuth = await new MicrosoftAuthentication({
        token_type: response.token_type,
        access_token: response.access_token,
        scope: response.scope,
        grant_type: 'authorization_code',
        id: id,
        screenName: screenName,
      }).save();
    }
    return microsoftAuth;
  } catch (error) {
    throw new Error('Error registering Microsoft account: ' + error);
  }
}

export {requestAccessToken, registerMicrosoftAccount};
export type {MicrosoftResponse};