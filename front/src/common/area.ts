import axios from 'axios';
import {getAuthorizedHeader} from './auth';

interface IAreaDetails {
  actionId: string;
  actionData: object;
  reactionId: string;
  reactionData: object;
}

interface IArea {
  _id: string;
  actionId: string;
  actionType: string;
  reactionId: string;
  reactionType: string;
}

async function loadAreas(): Promise<IArea[]> {
  return axios.get('/api/areas', {headers: getAuthorizedHeader()})
    .then(response => {
      if (response.status === 204)
        return [] as IArea[];
      const areas: IArea[] = response.data.areas;

      return areas;
    })
    .catch(reason => {
      console.error(reason);
      return [];
    });
}

async function retrieveAreaDetails(id: string): Promise<IAreaDetails> {
  return axios.get(`/api/areas/${id}`, {headers: getAuthorizedHeader()})
    .then(response => {
      const area: IAreaDetails = response.data.details;

      return area;
    })
    .catch(reason => {
      console.error(reason);
      return Promise.reject(new Error('Unable to retrieve AREA details'));
    });
}

async function deleteArea(id: string): Promise<void> {
  return axios.delete(`/api/areas/${id}`, {headers: getAuthorizedHeader()})
    .then(() => Promise.resolve())
    .catch(reason => {
      console.error(reason);
      return Promise.reject(new Error('Unable to retrieve AREA details'));
    });
}

async function createArea(actionType: string, actionData: object, reactionType: string, reactionData: object): Promise<void> {
  return axios.post(`/api/areas`, {actionType, actionData, reactionType, reactionData}, {headers: getAuthorizedHeader()})
    .then(() => Promise.resolve())
    .catch(reason => {
      console.error(reason);
      return Promise.reject(new Error('Unable to create AREA'));
    });
}

export type {IArea, IAreaDetails};
export {loadAreas, retrieveAreaDetails, deleteArea, createArea};
