import React, {CSSProperties, useState} from 'react';

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

  const wrapperStyle: CSSProperties = {
    width: '100%',
  }
  const inputStyle: CSSProperties = {
    border: '1px solid #ccc',
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
    marginBottom: 10,
    boxSizing: 'border-box',
    width: '100%',
  };

  function updateValue(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;

    setCurrentValue(newValue);
    callback(newValue);
  }

  return (
    <div style={wrapperStyle}>
      <input style={inputStyle}
             inputMode={type}
             value={currentValue}
             disabled={disabled}
             onChange={event => updateValue(event)}/>
    </div>
  )
}

export default InputText;
