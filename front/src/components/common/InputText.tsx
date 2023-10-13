import React, {useState} from 'react';

type InputTextType = 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';

interface InputTextProperties {
  type: InputTextType;
  value: string;
  disabled: boolean;
  callback: (value: string) => void;
}

function InputText(props: InputTextProperties): React.JSX.Element {
  const {type, value, disabled, callback} = props;
  const [currentValue, setCurrentValue] = useState(value);

  return (
    <div>
      <input className={"InputText"} inputMode={type} value={currentValue} disabled={disabled} onChange={event => {
        const newValue = event.currentTarget.value;

        setCurrentValue(newValue);
        callback(newValue);
      }}/>
    </div>
  )
}

export default InputText;
