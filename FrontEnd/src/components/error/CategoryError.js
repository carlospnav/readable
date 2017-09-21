import React from 'react';
import { Link } from 'react-router-dom';


const CategoryError = () => {


  return (
    <section> 
      <p>Please supply a category to work with this app. Hint: 'all' retrieves all posts from all categories. </p>
      <Link to="/category" >Return to Main page. </Link>
    </section>
  )
}

export default CategoryError;