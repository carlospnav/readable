import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CategoryError from './components/error/CategoryError';
import CategoriesContainer from './components/containers/CategoriesContainer';
import PostsListContainer from './components/containers/PostsListContainer';
import PostDetailContainer from './components/containers/PostDetailContainer';
import FormSelector from './components/containers/FormSelector';
import { performRequestIfAble, GET_CATEGORIES, GET_POSTS } from './actions';

const CATEGORIES = 'categories';
const POSTS = 'posts';

class App extends Component{

  componentDidMount(){
    this.props.initializer(performRequestIfAble(GET_CATEGORIES, CATEGORIES));
    this.props.initializer(performRequestIfAble(GET_POSTS, POSTS));
  }

  render(){
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <Redirect to="/category" />
        )} />
        <header>
          <h2 className="app-title"> Readable </h2>
          <Route exact path="/category" component={CategoriesContainer} />
          <Route path="/category/:category" component={CategoriesContainer} />
          
          <Route exact path="/create/post" render={() => (
            <h2 className="form-title nav-menu-item">Create Post</h2>
          )} />
          <Route path="/edit/post/:id" render={() => (
            <h2 className="form-title nav-menu-item">Edit Post</h2>
          )} />
          <Route exact path="/details/:id" render={() =>(
            <h2 className="form-title nav-menu-item">Post Details</h2>
          )} />
        </header>

        <Route exact path="/category" component={PostsListContainer} />
        <Route path="/category/:category" component={PostsListContainer} />

        <Route exact path="/create/post" component={FormSelector} />
        <Route path="/edit/post/:id" component={FormSelector} />

        <Route exact path="/details/:id" component={PostDetailContainer} />

        
        <Route exact path="/categoryError" component={CategoryError} />
      </div>
    );
  }
}

export default App;


      /*
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(ADD_COMMENT, 'comments', { id:121, parentId: '6ni6ok3ym7mf1p33lnez', timestamp: 1469479767190, body: 'Moar comments.', author: 'thingsix' })) }}> ADD </button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(EDIT_COMMENT, 'comments', { id:121, parentId: '6ni6ok3ym7mf1p33lnez', timestamp: 1469479767190, body: 'Moar comments.', author: 'thingsixtySix' })) }}> EDIT </button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(DELETE_COMMENT, 'comments', 121)) }}> DELETE </button>
      */

