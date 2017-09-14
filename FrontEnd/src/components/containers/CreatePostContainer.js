import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from '../views/PostForm'
import { performRequestIfAble, GET_CATEGORIES } from '../../actions';

const CATEGORIES = 'categories';

class CreatePostContainer extends Component {

  componentDidMount(){
    if (!this.areThereCategories())
      this.props.dispatch(performRequestIfAble(GET_CATEGORIES, CATEGORIES));
  }

  areThereCategories(){
    const {categories} = this.props;
    
     return (Object.keys(categories).length > 0) ? true : false;

  }

  processProps = () => {
    const {posts, match} = this.props;

    console.log(posts[match.params.id]);
    if (!match)
      return {};

    return posts[match.params.id];
  }

  render() {
    const {categories} = this.props;
    
    //TAKE A LOOK AT PROCESS PROPS BECAUSE IT SHOULDN"T RUN AT ALL BEFORE CATEGORIES IS LOADED.
    return (
      (this.areThereCategories()) && (
        <PostForm post={this.processProps()} categories={Object.keys(categories)} />
      )
    )
  }
}

const mapStateToProps = (state) => {
  const {posts, categories} = state;

  return {
    posts,
    categories
  }
}

export default connect(mapStateToProps)(CreatePostContainer);