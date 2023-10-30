import axios from 'axios';
import {IFacebookAuthentication, FacebookAuthentication} from '../model/facebookAuth';

interface FacebookResponse {
    token_type: string;
    access_token: string;
    expires_in: string;
}

async function requestAccessToken(code: string): Promise<FacebookResponse> {
    const API_URL = process.env.API_URL;
    const redirectUri = `${API_URL}/auth/facebook/callback`;
    const tokenParams = {
        client_id: process.env.FACEBOOK_CLIENT_ID,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET,
        code,
        redirect_uri: redirectUri,
    };

    return axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
        params: tokenParams
    })
    .then(response => {
        const token = response.data;
        if (token.access_token) {
            return token;
        } else {
            throw new Error('Error when retrieving Facebook access token');
        }
    })
    .catch(error => {
        throw new Error('Error when retrieving Facebook access token');
    });
}

async function registerFacebookAccount(response: FacebookResponse): Promise<IFacebookAuthentication> {
    try {
        const fields = 'id,name';
        const idResponse = await axios.get(`https://graph.facebook.com/v18.0/me?fields=${fields}&access_token=${response.access_token}`);

        const id = idResponse.data.id;
        const screenName = idResponse.data.name;

        let FacebookAuth = await FacebookAuthentication.findOne({id}).exec();
        if (FacebookAuth === null) {
            FacebookAuth = await new FacebookAuthentication({
            token_type: response.token_type,
            access_token: response.access_token,
            expires_in: response.expires_in,
            userId: id,
            screenName: screenName,
          }).save();
        }
        return FacebookAuth;
      } catch (error) {
        throw new Error('Error registering Facebook account: ' + error);
      }
}


export {requestAccessToken, registerFacebookAccount};
export type {FacebookResponse};
