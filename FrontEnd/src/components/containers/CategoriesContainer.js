import React, { Component } from 'react';
import { connect } from 'react-redux';
import { performRequestIfAble, GET_CATEGORIES } from '../../actions'
import Categories from '../views/categories';

const CATEGORIES = 'categories';

class CategoriesContainer extends Component{
  constructor(props){
    super(props)
  }


  componentDidMount = () => {
    this.props.dispatch(performRequestIfAble(GET_CATEGORIES, CATEGORIES));
  }

  render() { 
    const {categories} = this.props;
    return (
      <Categories categories={categories} />
    )
  }
}

const mapStateToProps = (state) => {
  const { categories } = state;
  const categoriesArr = Object.keys(categories);

  if (categoriesArr.length === 0)
    return { categories: null }
  
  return { categories: categoriesArr};
};

export default connect(mapStateToProps)(CategoriesContainer);