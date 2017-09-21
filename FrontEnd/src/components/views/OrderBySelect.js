import React from 'react';

const OrderBySelect = ({options, comparer, cb}) => {
  return (
    (options) && (
      <select onChange={ (event) => (cb(event)) } value={ comparer } >
        {options.map((option, index) => {
          return <option key={index} value={option}> Sort by {option} </option>
        })}
      </select>
    )    
  )
}

export default OrderBySelect;