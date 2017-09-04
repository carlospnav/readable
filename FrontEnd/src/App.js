import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { fetchPostsIfNeeded } from './actions';

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
        <button onClick={ () => { this.props.dispatch(fetchPostsIfNeeded())}} >INIT</button>
        <ul>
          {this.props.posts.map((post) => {
            return <li>{post.id}</li>
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
    console.log(posts);
  return {
    posts: posts
  }
}

export default connect(mapStateToProps)(App);
