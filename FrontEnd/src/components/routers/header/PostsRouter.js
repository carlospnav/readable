import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CategoriesContainer from '../../containers/CategoriesContainer';

/* Routes:
  / - redirected to /all - All categories
  /:category - Specific Category
  /new - Create Post
*/
const PostsRouter = ({match}) => {
  return (
    <nav>
      <Route exact path={match.url} render={() => (
        <Redirect to="/posts/all" />
      )} />
      <Route exact path={`${match.url}/:id`} render={(match) => {
        const {id} = match.match.params;
        return (
        (id === 'new') ? 
        <h2 className="form-title nav-menu-item">Create</h2> :
         <CategoriesContainer />
      )}} />
    </nav>
  )
}

export default PostsRouter;











