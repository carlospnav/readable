import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router';
import { performRequestIfAble, GET_POSTS, VOTE_POST } from '../../actions'
import PostsList from '../views/PostsList';

const POSTS = 'posts';

class UnrouteredPostsListContainer extends Component {

  static propTypes = {
    history: Proptypes.object.isRequired
  }

  //used arrow function to avoid having to bind the function in the state to access this properly.
  handleVote = ({id, vote}) => {
    this.props.dispatch(performRequestIfAble(VOTE_POST, POSTS, {id, option: vote}));
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
      this.props.history.push('/categoryError');
    
    return filteredPosts;
  }

  render(){

    return(
      <PostsList posts={this.processPosts()} voteCb={this.handleVote} />
    )
  }
}

const mapStateToProps = (state) => {
  const { posts, categories } = state;

  return {
    posts,
    categories
  }
}

const PostsListContainer = withRouter(UnrouteredPostsListContainer);
export default connect(mapStateToProps)(PostsListContainer);