import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import PostsList from '../views/PostsList';

const UnrouteredPostsListContainer = ({dispatch, history, posts, match, categories}) => {
  const categoriesArr = Object.keys(categories);
  const postsArr = Object.keys(posts).map((id) => {
    return posts[id];
  });

  /* Transforms both the categories and the posts from the store
  into arrays. Then, looks for the category routing parameter passed
  down from Router that represents the specific category linked to by
  the URL and returns a filtered list of posts depending that parameter.
  */
  const processPosts = () =>{
    let filteredPosts;

    /* Filters the posts array by category. If the category in the URL isn't 
    in the array of existing categories, returns null to allow PostsList to 
    redirect to an error page.
    */
    filteredPosts = (match.params.category) ? 
      (
        (categoriesArr.includes(match.params.category)) ? 
        postsArr.filter((post) => { return post.category === match.params.category}) 
        : null
      )
    : postsArr;

    return filteredPosts;
  }

  /* PostsList will not render unless categories and posts have been loaded.
  This allows PostsList to redirect to Error Page before mounting, if the posts 
  it receives are null.
  */
  return(
    (categoriesArr.length > 0 && postsArr.length > 0) && (
      <PostsList posts={processPosts()} history={history} />
    )
  )
}

UnrouteredPostsListContainer.propTypes = {
  history: PropTypes.object.isRequired
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