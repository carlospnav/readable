import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  render(){
    const {posts} = this.props;

    return(
      <PostsList posts={posts} />
    )
  }
}

const mapStateToProps = (state) => {
  const { posts } = state;
  const keys = Object.keys(posts);

  if (keys.length === 0)
    return {
      posts: null
    }
  
  return {
    posts: keys.map((id) => {
      return posts[id];
    })
  }
}

export default connect(mapStateToProps)(PostsListContainer);