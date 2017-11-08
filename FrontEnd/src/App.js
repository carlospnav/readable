import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/views/layouts/Layout';
// import CategoryError from './components/error/CategoryError';
// import CategoriesContainer from './components/containers/CategoriesContainer';
// import PostsListContainer from './components/containers/PostsListContainer';
// import PostDetailContainer from './components/containers/PostDetailContainer';
// import FormSelector from './components/containers/FormSelector';
import { performRequestIfAble, GET_CATEGORIES, GET_POSTS } from './actions';

const CATEGORIES = 'categories';
const POSTS = 'posts';

//TODOS:
/*
2 - Test comments logics. Add/Edit/Delete
*/

class App extends Component{

  componentDidMount(){
    this.props.initializer(performRequestIfAble(GET_CATEGORIES, CATEGORIES));
    this.props.initializer(performRequestIfAble(GET_POSTS, POSTS));
  }

  render(){
    return (
      <Route path="/" component={Layout} />
    );
  }
}

export default App;


      /*
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(ADD_COMMENT, 'comments', { id:121, parentId: '6ni6ok3ym7mf1p33lnez', timestamp: 1469479767190, body: 'Moar comments.', author: 'thingsix' })) }}> ADD </button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(EDIT_COMMENT, 'comments', { id:121, parentId: '6ni6ok3ym7mf1p33lnez', timestamp: 1469479767190, body: 'Moar comments.', author: 'thingsixtySix' })) }}> EDIT </button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(DELETE_COMMENT, 'comments', 121)) }}> DELETE </button>
      */

