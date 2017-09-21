import React from 'react';
import { connect } from 'react-redux';
import Categories from '../views/Categories';

/* Container component connected to the store that
gets the categories from it, transforms into an array
and passes it down to the Categories presentational component. 
*/
const CategoriesContainer = ({categories}) => {

  /* Transforms the categories object from the store into
  an array that can be iterated upon to generate categories 
  in the child component.
  */
  const processCategories = () => {
    const categoriesArr = Object.keys(categories);
    
    return categoriesArr;
  }

  return (
    <Categories categories={processCategories()}  />
  )
}

const mapStateToProps = (state) => {
  const { categories } = state;
  
  return {
    categories
  }
};

export default connect(mapStateToProps)(CategoriesContainer);