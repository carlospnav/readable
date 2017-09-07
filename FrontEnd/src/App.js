import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { performRequestIfAble } from './actions';
import { GET_POSTS, ADD_POST, EDIT_POST, DELETE_POST } from './actions';

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
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(EDIT_POST, 'posts', { id:6, timestamp: 1467166872634, title: 'lololol', body: 'some body', author: 'some author', category: 'udacity', voteScore: 1, deleted: false })) }}> EDIT </button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(DELETE_POST, 'posts', 6)) }}> DELETE </button>
        <ul>
          {this.props.posts.map((post) => {
            return (
              <li>{`${post.id} autor: ${post.author} titulo: ${post.title} deletado: ${post.deleted}`}</li>
            )
        })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let {posts} = state;
  posts ? 
    posts = Object.keys(posts).map((postId) => {
      return posts[postId];
    }) :
    posts = [];
  return {
    posts: posts
  }
}

export default connect(mapStateToProps)(App);
