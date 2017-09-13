import React from 'react';
import { Route } from 'react-router-dom';
import CategoriesContainer from '../containers/CategoriesContainer';
import PostsListContainer from '../containers/PostsListContainer';

const Root = ({match}) => {

  return (
    <main>
      <CategoriesContainer />
      <PostsListContainer match={match} />
    </main>
  )
}

export default Root;