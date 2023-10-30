import React, {useEffect, useState} from 'react';
import {deleteArea, IArea, IAreaDetails, retrieveAreaDetails} from '../../common/area';

import './AreaCard.css';
import {faClock, faXmark} from '@fortawesome/free-solid-svg-icons';
import {faDiscord, faReddit} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {IService, SERVICE_ITEMS, ServiceType} from '../../common/service';

interface IAreaCardProperties {
  area: IArea;
  refresh: () => void;
}

interface IAreaDetailsProperties {
  details: object;
}

const formatText = (value: string) => value
  .split('-')
  .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(' ');

function AreaDetails(props: IAreaDetailsProperties): React.JSX.Element {
  const details: object = props.details;

  function renderDetails() {
    return Object.getOwnPropertyNames(details)
      .filter((field: string) => !['_id', 'userId', '__v'].includes(field))
      .map((field: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const data: object = details[field];

        return (<p key={field}>
          <span className={'key'}>{field}:</span> {JSON.stringify(data)}
        </p>);
      });
  }

  return (
    <div className={'details'}>
      {details && renderDetails()}
    </div>
  );
}

function AreaCard(props: IAreaCardProperties): React.JSX.Element {
  const area: IArea = props.area;
  const actionService: IService = SERVICE_ITEMS.get(area.actionType.split(':')[0] as ServiceType);
  const reactionService: IService = SERVICE_ITEMS.get(area.reactionType.split(':')[0] as ServiceType);
  const [areaDetails, setDetails] = useState(null as IAreaDetails);

  useEffect(() => {
    retrieveAreaDetails(area._id)
      .then(details => setDetails(details))
      .catch(() => console.warn('Unable to load details'));
  }, [area]);

  if (!actionService || !reactionService) {
    return (
      <div>
        <p>Unable to parse action {area.actionType} / {area.reactionType}</p>
      </div>
    )
  }

  return (
    <div className={'card-container'}>
      <div className={'area-part action'} style={{backgroundColor: actionService.color}}>
        <header>
          <FontAwesomeIcon icon={actionService.icon} size={'3x'}/>
          <p>{formatText(area.actionType)}</p>
        </header>
        {areaDetails && <AreaDetails details={areaDetails.actionData}/>}
      </div>

      <div className={'gradient'} style={{
        background: `linear-gradient(90deg, ${actionService.color} 0%, ${reactionService.color} 100%)`,
      }}></div>

      <div className={'area-part reaction'} style={{backgroundColor: reactionService.color}}>
        <header>
          <FontAwesomeIcon icon={reactionService.icon} size={'3x'}/>
          <p>{formatText(area.reactionType)}</p>
        </header>
        {areaDetails && <AreaDetails details={areaDetails.reactionData}/>}
      </div>

      <div className={'button delete'} onClick={async () => {
        await deleteArea(area._id);
        props.refresh();
      }}>
        <FontAwesomeIcon icon={faXmark} size={'lg'}/>
      </div>
    </div>
  );
}

export default AreaCard;
