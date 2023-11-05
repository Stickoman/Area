import {DockerPushAction, IDockerPushData} from '../../model/action/dockerPushAction';

const createDockerPushAction = async (userId: string, data: IDockerPushData): Promise<string> => {
  const document = await new DockerPushAction({userId, ...data}).save();

  return document.id;
};

export {createDockerPushAction};
