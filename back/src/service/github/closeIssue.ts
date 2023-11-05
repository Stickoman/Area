import axios from 'axios';
import { GithubAuthentication } from '../../model/githubAuth';

async function closeGitHubIssue(userId: string, repository: string, issueId: string) {
  try {
    const githubAuth = await GithubAuthentication.findOne({id: userId}).exec();
    const accessToken = githubAuth.access_token;
    const githubApiUrl = `https://api.github.com/repos/${repository}/issues/${issueId}`;
    const requestBody = {
      state: 'closed',
    };
    const requestHeaders = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'AREA/1.0',
    };

    const response = await axios.patch(githubApiUrl, requestBody, {headers: requestHeaders});
    return Promise.resolve(response.data);
  } catch (error) {
    console.log("Error while closing a GitHub issue: " + error);
    return Promise.reject(new Error('Error while closing a GitHub issue'));
  }
}

export { closeGitHubIssue };