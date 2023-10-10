import React, {CSSProperties, useEffect} from 'react';
import {FlowProps} from '../../common/flow';
import {useNavigate} from 'react-router-dom';

function Finish(props: FlowProps): React.JSX.Element {
  const {flow} = props;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/profile');
    }, 3000);
  }, []);

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

  return (
    <div style={wrapperStyle}>
      <p>You have successfully associated your {flow.service[0].toUpperCase() + flow.service.slice(1)} account!</p>
      <p>Please wait while redirecting...</p>
    </div>
  );
}

export default Finish;
