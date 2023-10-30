import React, {CSSProperties, useEffect, useState} from 'react';
import {capitalize} from '../../common/utils';

type InputTextType = 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';

interface InputTextProperties {
  type: InputTextType;
  value: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  callback: (value: string) => void;
}

function InputText(props: InputTextProperties): React.JSX.Element {
  const {type, value, label, disabled, placeholder, callback} = props;
  const [currentValue, setCurrentValue] = useState(value);
  const [inputId, setInputId] = useState('');

  useEffect(() => {
    setInputId((Math.random() + 1).toString(36));
  }, []);

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

  const inputElement = <input style={inputStyle}
                       id={inputId}
                       inputMode={type}
                       value={currentValue}
                       disabled={disabled}
                       placeholder={placeholder}
                       onChange={event => updateValue(event)}/>;
  return (
    <div style={wrapperStyle}>
      {label &&
        <label>
          {capitalize(label)}
          {inputElement}
        </label>
      }

      {!label && inputElement}
    </div>
  )
}

export default InputText;
