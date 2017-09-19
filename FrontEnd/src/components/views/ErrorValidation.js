import React from 'react';

const ErrorValidation = ({errorArr}) => {

  return (
    <ul className="error-validation">
    {errorArr.map((error, index) => (
      <li className="invalid-text" key={index}>
        {error}
      </li>
      ))}
    </ul>
  )
}

export default ErrorValidation;