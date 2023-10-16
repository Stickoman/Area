import {ActionType} from '../../common/action.interface';
import {ReactionType} from '../../common/reaction.interface';
import {createAction} from './actionService';
import {createReaction} from './reactionService';
import {Area, IArea} from '../../model/area';

interface AreaConfiguration {
  actionType: ActionType;
  actionData: object;
  reactionType: ReactionType;
  reactionData: object;
}

async function saveArea(userId: string, config: AreaConfiguration) {
  const {actionType, reactionType} = config;
  const actionId = await createAction(userId, actionType, config.actionData);
  const reactionId = await createReaction(userId, reactionType, config.reactionData);

  await new Area({userId, actionType, actionId, reactionType, reactionId}).save();
}

async function retrieveAreas(userId: string): Promise<IArea[]> {
  return await Area.find({userId}).exec();
}

export {saveArea, retrieveAreas};
