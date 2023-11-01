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

async function sendEmbedWebhook(url: string, username: string, title: string, description: string, color: string) {
  return axios
    .post(url, {content: null, username: username, embeds: [{title, description, color}]})
    .then(() => Promise.resolve())
    .catch(reason => {
      console.warn('Failed to contact Discord webhook: ' + reason);
      return Promise.reject(new Error('Failed to contact Discord webhook'));
    });
}

export {sendWebhook, sendEmbedWebhook};
