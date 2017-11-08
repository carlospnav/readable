import React from 'react';
import { Route } from 'react-router-dom';

/* Routes:
  / - All categories
  /:category - Specific Category
*/
const PostRouter = ({match}) => {
  return (
    <nav>
      <Route exact path={`${match.url}/:id`} render={() => (
        <h2 className="form-title nav-menu-item">Post Details</h2>
      )} />
      <Route path={`${match.url}/:id/edit`} render={() => (
        <h2 className="form-title nav-menu-item">Edit</h2>
      )} />
    </nav>
  )
}

export default PostRouter;