import React from 'react';
import { Link } from 'react-router-dom';

/* Presentational component that receives the categories and displays
them in the page, along with links to select a category.
*/
const Categories = ({categories}) => {
  return (
    <section className="categories">
      <nav className="category-navigation">
        {(categories) && (
          categories.map((category, index) => <Link key={index} className="category nav-menu-item" to={`/category/${category}`}>{category}</Link>)
        )}
        <Link className="category nav-menu-item" to="/category">all posts</Link>
      </nav>
      <p className="info">Select a category above to filter the posts.</p>
    </section>
  )
}

export default Categories;