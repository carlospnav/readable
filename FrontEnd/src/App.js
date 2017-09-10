import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { performRequestIfAble } from './actions';
import { GET_POSTS, ADD_POST, EDIT_POST, DELETE_POST, GET_COMMENTS, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from './actions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(GET_POSTS, 'posts')) }} >INIT</button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(ADD_POST, 'posts', { id:1, timestamp: 1467166872634, title: 'some title', body: 'some body', author: 'some author', category: 'udacity', voteScore: 1, deleted: false })) }}> ADD </button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(EDIT_POST, 'posts', { id:1, timestamp: 1467166872634, title: 'lololol', body: 'some body', author: 'some author', category: 'udacity', voteScore: 1, deleted: false })) }}> EDIT </button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(DELETE_POST, 'posts', 1)) }}> DELETE </button>
        <ul>
          {this.props.posts.map((post) => {
            return (
              <li>{`${post.id} autor: ${post.author} titulo: ${post.title} deletado: ${post.deleted}`}</li>
            )
        })}
        </ul>
        <hr/>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(GET_COMMENTS, 'comments', '8xf0y6ziyjabvozdd253nd'))}}> GET COMMENTS </button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(GET_COMMENTS, 'comments', '6ni6ok3ym7mf1p33lnez'))}}> GET COMMENTS 2</button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(ADD_COMMENT, 'comments', { id:121, parentId: '6ni6ok3ym7mf1p33lnez', timestamp: 1469479767190, body: 'Moar comments.', author: 'thingsix', voteScore: 4, deleted: false, parentDeleted: false })) }}> ADD </button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(EDIT_COMMENT, 'comments', { id:121, parentId: '6ni6ok3ym7mf1p33lnez', timestamp: 1469479767190, body: 'Moar comments.', author: 'thingsixtySix', voteScore: 4, deleted: false, parentDeleted: false })) }}> EDIT </button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(DELETE_COMMENT, 'comments', 121)) }}> DELETE </button>
        <ul>
          {this.props.comments.map((comment) => {
            return (
              <li>{`post: ${comment.parentId} Id: ${comment.id} autor: ${comment.author} deletado: ${comment.deleted}`}</li>
            )
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let {posts, comments} = state;
  const ObjToArr = (entity) => {
    entity ?
      entity = Object.keys(entity).map((entityId) => {
        return entity[entityId];
      }) :
      entity = [];
    return entity;
  };

  // posts ? 
  //   posts = Object.keys(posts).map((postId) => {
  //     return posts[postId];
  //   }) :
  //   posts = [];

  return {
    posts: ObjToArr(posts),
    comments: ObjToArr(comments),
  }
}

export default connect(mapStateToProps)(App);
