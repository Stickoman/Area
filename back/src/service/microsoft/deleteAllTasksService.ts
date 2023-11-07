import {MicrosoftAuthentication} from '../../model/microsoftAuth';
import axios from 'axios';

async function deleteAllTasksService(subject: string, message: string, userMicrosoftID: string) {
  const MicrosoftAuth = await MicrosoftAuthentication.findOne({id: userMicrosoftID}).exec();
  const accessToken = MicrosoftAuth.access_token;

  try {
    const listsResponse = await axios.get('https://graph.microsoft.com/v1.0/me/todo/lists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const taskLists = listsResponse.data.value;
    if (taskLists.length === 0) {
      console.log('No task lists found.');
      return;
    }

    for (const taskList of taskLists) {
      console.log(`Processing list: ${taskList.displayName}`);

      const tasksResponse = await axios.get(`https://graph.microsoft.com/v1.0/me/todo/lists/${taskList.id}/tasks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const tasks = tasksResponse.data.value;
      if (tasks.length === 0) {
        console.log('No tasks to delete in this list.');
        continue;
      }
      for (const task of tasks) {
        await axios.delete(`https://graph.microsoft.com/v1.0/me/todo/lists/${taskList.id}/tasks/${task.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(`Deleted task: ${task.title}`);
      }
    }
  } catch (error) {
    console.error('Error deleting tasks:', error);
  }
}

export default deleteAllTasksService;
