import React from 'react';
import { Route } from 'react-router-dom';
import PostRouter from '../../routers/header/PostRouter';
import PostsRouter from '../../routers/header/PostsRouter';

const AppHeader = ({match}) => {
  return (
    <header>
      <h2 className="app-title"> Readable </h2>
      <Route path={`${match.url}posts`} component={PostsRouter} />
      <Route path={`${match.url}post`} component={PostRouter} />

      {/* <Route path="/category/:category" component={CategoriesContainer} />
      
      <Route exact path="/details/:id" render={() =>(
        <h2 className="form-title nav-menu-item">Post Details</h2>
      )} /> */}
  </header>
  )
}

export default AppHeader;