import {ObjectId} from 'mongodb';
import {Area, IArea} from '../model/area';

type ActionType = 'timer:scheduled_task' | 'reddit:poll_rss' | 'github:poll_issues';

async function isOrphanAction(actionType: ActionType, actionId: ObjectId, userId: string): Promise<boolean> {
  const area: IArea = await Area.findOne({actionType, actionId, userId}).exec();

  return (area === null);
}

export {isOrphanAction};
export type {ActionType};
