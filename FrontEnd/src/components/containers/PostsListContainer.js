import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { performRequestIfAble, GET_POSTS } from '../../actions'
import PostsList from '../views/PostsList';

const POSTS = 'posts';

class PostsListContainer extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(performRequestIfAble(GET_POSTS, POSTS))
  }

  processPosts(){
    const { posts, match, categories } = this.props;
    const keys = Object.keys(posts);
    const CategoriesArr = Object.keys(categories);
    let filteredPosts;
  
    //rethink this maybe to account for /category/LOLLERSKATES or whatever
    if (keys.length === 0)
      return null;
    console.log(CategoriesArr);
    filteredPosts = keys.map((id) => {
      return posts[id];
    });

    filteredPosts = (match.params.category) ? 
      (
        (CategoriesArr.includes(match.params.category)) ? 
        filteredPosts.filter((post) => { return post.category === match.params.category}) 
        : null
      )
      : filteredPosts;

    if (!filteredPosts)
      <Redirect to="/categoryError"/>
    
    return filteredPosts;
  }

  render(){

    return(
      <PostsList posts={this.processPosts()} />
    )
  }
}

const mapStateToProps = (state) => {
  const { posts, categories } = state;
  // const keys = Object.keys(posts), newPosts = [];

  // if (keys.length === 0)
  //   return {
  //     posts: null
  //   }

  //   console.log(props);
  // return {
  //   posts: keys.map((id) => {
  //     return posts[id];
  //   })
  // }
  return {
    posts,
    categories
  }
}

export default connect(mapStateToProps)(PostsListContainer);