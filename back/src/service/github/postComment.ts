import axios from 'axios';
import { GithubAuthentication } from '../../model/githubAuth';
import { reject } from '../authService';

async function postGithubComment(userId: string, repository: string, issueId: string, comment: string) {
  try {
    const githubAuth = await GithubAuthentication.findOne({id: userId}).exec();

    if (!githubAuth)
      return reject('Github Account not found');
    const accessToken = githubAuth.access_token;
    const githubApiUrl = `https://api.github.com/repos/${repository}/issues/${issueId}/comments`;
    const requestBody = {
      body: comment,
    };
    const requestHeaders = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'AREA/1.0',
    };

    const response = await axios.post(githubApiUrl, requestBody, {headers: requestHeaders});
    return Promise.resolve(response.data);
  } catch (error) {
    console.log("Error while posting a comment to a GitHub issue: " + error);
    return reject('Error while commenting github issue');
  }
}

export { postGithubComment };