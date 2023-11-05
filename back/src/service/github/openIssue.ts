import axios from 'axios';
import { GithubAuthentication } from '../../model/githubAuth';

async function createGitHubIssue(userId: string, repository: string, title: string, body: string) {
  try {
    const githubAuth = await GithubAuthentication.findOne({id: userId}).exec();
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
    return Promise.reject(new Error('Error while creating a GitHub issue'));
  }
}

export { createGitHubIssue };