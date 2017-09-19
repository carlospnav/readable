import React from 'react';
import ErrorValidation from './ErrorValidation';

const FormSet = ({config}) => {
  const { errorArr, onChangeHandler, field, value, specialClass, className, fieldType, placeholder } = config;
  const FormInputType = `${fieldType}`;

  return(
    <div className={`validation-box ${specialClass}`}>
      <ErrorValidation errorArr={errorArr} />
      <FormInputType
        onChange={(event) => onChangeHandler(field, event.currentTarget.value)} 
        className={className} 
        type="text" 
        value={value} 
        placeholder={placeholder}
      />
    </div>
  )
}

export default FormSet;