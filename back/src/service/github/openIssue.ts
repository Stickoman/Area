import axios from 'axios';
import { GithubAuthentication } from '../../model/githubAuth';
import { reject } from '../authService';

async function createGitHubIssue(userId: string, repository: string, title: string, body: string) {
  try {
    const githubAuth = await GithubAuthentication.findOne({id: userId}).exec();

    if (!githubAuth)
      return reject('Github Account not found');
    const accessToken = githubAuth.access_token;
    const githubApiUrl = `https://api.github.com/repos/${repository}/issues`;
    const requestBody = {
      title: title,
      body: body,
    };
    const requestHeaders = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'AREA/1.0',
    };

    const response = await axios.post(githubApiUrl, requestBody, { headers: requestHeaders });
    return Promise.resolve(response.data);
  } catch (error) {
    console.log("Error while creating a GitHub issue: " + error);
    return reject('Error while opening github issue');
  }
}

export { createGitHubIssue };