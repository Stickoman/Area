import {ActionType} from '../../common/action.interface';
import {ReactionType} from '../../common/reaction.interface';
import {createAction, deleteAction} from './actionService';
import {createReaction, deleteReaction} from './reactionService';
import {Area, IArea} from '../../model/area';

interface AreaConfiguration {
  actionType: ActionType;
  actionData: object;
  reactionType: ReactionType;
  reactionData: object;
}

async function saveArea(userId: string, config: AreaConfiguration) {
  const {actionType, reactionType} = config;
  const reactionId = await createReaction(userId, reactionType, config.reactionData);
  const actionId = await createAction(userId, actionType, config.actionData);

  await new Area({userId, actionType, actionId, reactionType, reactionId}).save();
}

async function retrieveAreas(userId: string): Promise<IArea[]> {
  return await Area.find({userId}).exec();
}

async function deleteArea(id: string) {
  const area: IArea = await Area.findById(id).exec();

  await deleteAction(area.actionId, area.actionType);
  await deleteReaction(area.reactionId, area.reactionType);
  await Area.deleteOne({_id: id}).exec();
}

export {saveArea, retrieveAreas, deleteArea};
