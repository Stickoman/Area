import React, {useEffect, useState} from 'react';
import {loadAreas} from '../../common/area';

import './AreasContainer.css';
import AreaCard from './AreaCard';

function AreasContainer(): React.JSX.Element {
  const [cards, setCards] = useState([] as React.JSX.Element[]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    loadAreas()
      .then(data => {

        setCards(data.map(area => {
          return <AreaCard key={area._id} area={area} refresh={() => setRefresh(refresh + 1)}/>;
        }));
      })
      .catch(() => setCards(null));
  }, [refresh]);

  return (
    <div className={'container'}>
      <h6>Configuration</h6>

      {!!cards && cards}
      {!cards && <p>Unable to load AREAs</p>}
    </div>
  );
}

export default AreasContainer;
