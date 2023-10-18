import axios from 'axios';

async function sendWebhook(url: string, username: string, message: string) {
  return axios
    .post(url, {content: message, username: username})
    .then(() => Promise.resolve())
    .catch(reason => {
      console.warn('Failed to contact Discord webhook: ' + reason);
      return Promise.reject(new Error('Failed to contact Discord webhook'));
    });
}

export {sendWebhook};
