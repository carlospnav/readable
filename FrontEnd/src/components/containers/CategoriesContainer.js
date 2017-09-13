import React, { Component } from 'react';
import { connect } from 'react-redux';
import { performRequestIfAble, GET_CATEGORIES } from '../../actions'
import Categories from '../views/Categories';

const CATEGORIES = 'categories';

class CategoriesContainer extends Component{
  constructor(props){
    super(props)
  }


  componentDidMount = () => {
    this.props.dispatch(performRequestIfAble(GET_CATEGORIES, CATEGORIES));
  }

  //DONE OUTSIDE MAPSTATETOPROPS to avoid redux re-rendering component multiple times due to perceived change in the store.
  processCategories = () => {
    const { categories } = this.props;
    const categoriesArr = Object.keys(categories);
    
      if (categoriesArr.length === 0)
        return categoriesArr;
      
      return categoriesArr;
  }

  render() { 
    return (
      <Categories categories={this.processCategories()} />
    )
  }
}

const mapStateToProps = (state) => {
  const { categories } = state;
  
  return {
    categories
  }
};

export default connect(mapStateToProps)(CategoriesContainer);