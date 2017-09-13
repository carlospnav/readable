import React from 'react';
import { Link } from 'react-router-dom';

const Categories = ({categories}) => {
  return (
    <section>
      <h2> Categories </h2>
      {(categories) && (
        categories.map(category => <Link to={`/category/${category}`}>{category}</Link>)
      )}
      <p>Select a category to be taken to its view.</p>
    </section>
  )
}

export default Categories;