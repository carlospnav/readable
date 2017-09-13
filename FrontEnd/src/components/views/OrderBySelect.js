import React from 'react';

const OrderBySelect = ({options, comparer, cb}) => {

  return (
    (options) && (
      <select onChange={ (event) => (cb(event)) } value={ comparer } >
        {options.map((option) => {
          return <option value={option}> Compare by {option} </option>
        })}
      </select>
    )    
  )
}

export default OrderBySelect;