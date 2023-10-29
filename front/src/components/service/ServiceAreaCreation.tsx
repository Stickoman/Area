import React, {useState} from 'react';
import {IServiceItem, SERVICE_ITEMS, ServiceType} from '../../common/service';
import {capitalize} from '../../common/utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './ServiceAreaCreation.css';
import InputText from '../common/InputText';
import {ServicesContainerMode} from './ServicesContainer';
import {createArea} from '../../common/area';
import {useNavigate} from 'react-router-dom';

interface IServiceAreaCreationProperties {
  actionService: ServiceType;
  actionTask: string;
  reactionService: ServiceType;
  reactionTask: string;
}

function ServiceAreaCreation(props: IServiceAreaCreationProperties): React.JSX.Element {
  const navigate = useNavigate();
  const {actionService, actionTask, reactionService, reactionTask} = props;
  const action = SERVICE_ITEMS.get(actionService);
  const reaction = SERVICE_ITEMS.get(reactionService);
  const actionItem: IServiceItem = action.actions
    .find(item => item.name === actionTask);
  const reactionItem = reaction.reactions
    .find(item => item.name === reactionTask);

  const actionFields = actionItem.dataFields;
  const reactionFields = reactionItem.dataFields;

  const [actionData, setActionData] = useState(new Map<string, string>());
  const [reactionData, setReactionData] = useState(new Map<string, string>());

  function renderFields(fields: string[], mode: ServicesContainerMode): React.JSX.Element[] {
    function setData(field: string, value: string) {
      if (mode === 'actions')
        setActionData(actionData.set(field, value));
      if (mode === 'reactions')
        setReactionData(reactionData.set(field, value));
    }

    return fields.map(field => {
      return (
        <InputText key={field}
                   type={'text'}
                   value={''}
                   label={field}
                   placeholder={'Enter a value'}
                   callback={value => setData(field, value)}/>
      );
    });
  }

  const mapToObject = (map: Map<string, string>) => Object.fromEntries(map.entries());

  return (
    <div className={'area-wrapper'}>
      <div className={'area-container'}>
        <div className={'area-action'} style={{background: action.color}}>
          <header>
            <FontAwesomeIcon icon={action.icon} size={'xl'}/>
            <h3>{capitalize(actionService)} Action</h3>
          </header>

          <div className={'area-fields'}>
            {renderFields(actionFields, 'actions')}
          </div>
        </div>
        <div className={'area-reaction'} style={{background: reaction.color}}>
          <header>
            <FontAwesomeIcon icon={reaction.icon} size={'xl'}/>
            <h3>{capitalize(reactionService)} Reaction</h3>
          </header>

          <div className={'area-fields'}>
            {renderFields(reactionFields, 'reactions')}
          </div>
        </div>
      </div>

      <button onClick={() => {
        createArea(`${action.name}:${actionItem.name}`, mapToObject(actionData), `${reaction.name}:${reactionItem.name}`, mapToObject(reactionData))
          .then(() => navigate('/area'))
          .catch(reason => console.warn(reason));
      }}
              className={'button'}>Save AREA
      </button>
    </div>
  );
}

export default ServiceAreaCreation;
