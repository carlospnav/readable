import React from 'react';

const Categories = ({categories}) => {
  return (
    <section>
      <h2> Categories </h2>
      {(categories) && (
        categories.map(category => <button>{category}</button>)
      )}
      <p>Select a category to be taken to its view.</p>
    </section>
  )
}

export default Categories;