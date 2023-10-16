import axios from 'axios';
import qs from 'querystring';
import {GoogleAuthentication, IGoogleAuthentication} from '../model/googleAuth';

interface GoogleResponse {
  token_type: string;
  access_token: string;
  scope: string;
}
async function requestAccessToken(code: string): Promise<GoogleResponse> {
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const CALLBACK_URL = 'http://localhost:8080/api/auth/google/callback';

  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: 'profile email',
    code: code,
    redirect_uri: CALLBACK_URL,
    grant_type: 'authorization_code', // Ajout du paramètre grant_type
  };

  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error requesting Google access token: ' + error);
  }
}

async function registerGoogleAccount(response: GoogleResponse): Promise<IGoogleAuthentication> {
  try {

    const idResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        'Authorization': `${response.token_type} ${response.access_token}`,
      },
    });
    const id = idResponse.data.sub;
    const screenName = idResponse.data.name;
    let GoogleAuth = await GoogleAuthentication.findOne({id}).exec();

    if (GoogleAuth === null) {
        GoogleAuth = await new GoogleAuthentication({
        token_type: response.token_type,
        access_token: response.access_token,
        scope: response.scope,
        id: id,
        screenName: screenName,
      }).save();
    }
    return GoogleAuth;
  } catch (error) {
    throw new Error('Error registering Google account: ' + error);
  }
}

export {requestAccessToken, registerGoogleAccount};
export type {GoogleResponse};
