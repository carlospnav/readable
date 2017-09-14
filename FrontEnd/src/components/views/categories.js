import React from 'react';
import { Link } from 'react-router-dom';

const Categories = ({categories}) => {
  return (
    <section className="categories">
      <nav className="category-navigation">
        <h2 className="app-title"> Readable </h2>
        {(categories) && (
          categories.map(category => <Link className="category" to={`/category/${category}`}>{category}</Link>)
        )}
        <Link className="category" to="/category">all posts</Link>
      </nav>
      <p className="info">Select a category above to filter the posts.</p>
    </section>
  )
}

export default Categories;