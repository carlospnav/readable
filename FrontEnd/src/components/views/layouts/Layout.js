import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppBody from './AppBody';


const Layout = ({match}) => {
  return (
    <div className="App">
      <Route exact path="/" render={() => (
        <Redirect to="/posts" />
      )} />
      <AppHeader match={match} />
      <AppBody match={match} />
    </div>
  )
}

export default Layout;