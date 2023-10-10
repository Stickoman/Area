import React, {CSSProperties} from 'react';
import {FlowProps, serviceColor} from '../../common/flow';

const stepNames: string[] = ['Callback', 'Connection', 'Finish'];

function StepBar(props: FlowProps): React.JSX.Element {
  const {flow} = props;

  const wrapperStyle: CSSProperties = {
    display: 'flex',
  };

  function renderSteps(): React.JSX.Element[] {
    const spacerStyle = (color: string): CSSProperties => {
      return {
        width: 50,
        height: 2,
        backgroundColor: color,
        margin: 10,
      };
    };

    const stepTitleStyle = (color: string): CSSProperties => {
      return {
        color: color,
        fontWeight: 'bold',
      };
    };

    return stepNames
      .map((value, index) => {
        const active: boolean = index <= flow.step;
        const color: string = active ? serviceColor.get(flow.service) : 'black';

        return (
          <div key={value} style={{display: 'flex', alignItems: 'center'}}>
            {index > 0 && <div style={spacerStyle(color)}></div>}
            <p style={stepTitleStyle(color)}>{value}</p>
          </div>
        );
      });
  }

  return (
    <div style={wrapperStyle}>
      {renderSteps()}
    </div>
  );
}

export default StepBar;
