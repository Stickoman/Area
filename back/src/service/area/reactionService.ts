import {ReactionType} from '../../common/reaction.interface';
import {DiscordWebhookReaction, IDiscordWebhookData} from '../../model/reaction/discordWebhookReaction';
import {ITimerData} from '../../model/action/timerAction';
import {Area, IArea} from '../../model/area';
import {sendWebhook} from '../discord/webhookService';
import {IUser, User} from '../../model/user';
import {reject} from '../authService';

type ReactionFactory = (userId: string, data: object) => Promise<string>;

const reactionAssociations = new Map<ReactionType, ReactionFactory>();

reactionAssociations.set('discord-webhook', createDiscordWebhookReaction);

async function createDiscordWebhookReaction(userId: string, data: IDiscordWebhookData): Promise<string> {
  const webhook = await new DiscordWebhookReaction({userId, ...data}).save();

  return webhook.id;
}

async function createReaction(userId: string, type: ReactionType, data: object): Promise<string> {
  for (const [key, value] of reactionAssociations) {
    if (key == type) {
      return value(userId, data);
    }
  }
}

async function retrieveReactionData(id: string, type: ReactionType): Promise<object> {
  let data: object = {};

  switch (type) {
  case 'discord-webhook':
    data = (await DiscordWebhookReaction.findById(id).exec()) as ITimerData;
    break;
  }

  return data;
}

async function callReaction(actionId: string) {
  const area: IArea = await Area.findOne({actionId}).exec();
  if (area === null) return reject(`Orphan action #${actionId}`);
  const {reactionId, reactionType} = area;
  const reactionData: object = await retrieveReactionData(reactionId, reactionType);
  const user: IUser = await User.findById(area.userId).exec();

  const isValidDiscordWebhookData = (data: object): data is IDiscordWebhookData  => {
    return !!(data as IDiscordWebhookData);
  };

  switch (reactionType) {
  case 'discord-webhook':
    if (isValidDiscordWebhookData(reactionData)) {
      const fullName: string = `${user.firstName} ${user.lastName}`;
      const text: string = reactionData.text.replace('${NAME}', fullName);

      await sendWebhook(reactionData.webhookUrl, fullName, text);
    }
    break;
  }
}

export {createReaction, retrieveReactionData, callReaction};
