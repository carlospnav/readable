import React from 'react';
import CategoriesContainer from './containers/CategoriesContainer';
import PostsListContainer from './containers/PostsListContainer';

const Root = () => {

  return (
    <main>
      <CategoriesContainer />
      <PostsListContainer />
    </main>
  )
}

export default Root;