import {model, Schema} from 'mongoose';

interface IDockerPushData {
  repositoryName: string;
}

interface IDockerPushAction extends IDockerPushData {
  userId?: string;
}

const schema = new Schema<IDockerPushAction>({
  userId: {
    type: String,
    required: false,
  },
  repositoryName: {
    type: String,
    required: true,
  },
});

const DockerPushAction = model<IDockerPushAction>('DockerPushAction', schema);

export type {IDockerPushData, IDockerPushAction};
export {DockerPushAction};
