import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CategoryError from './components/error/CategoryError';
import CreatePostContainer from './components/containers/CreateOrEditPostContainer';
import CategoriesContainer from './components/containers/CategoriesContainer';
import PostsListContainer from './components/containers/PostsListContainer';


const App = ({match}) => {
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
        </header>

        <Route exact path="/category" component={PostsListContainer} />
        <Route path="/category/:category" component={PostsListContainer} />

        <Route exact path="/create/post" component={CreatePostContainer} />
        <Route path="/edit/post/:id" component={CreatePostContainer} />

        <Route exact path="/categoryError" component={CategoryError} />

      </div>
      
      
      /*
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(GET_POSTS, 'posts')) }} >INIT</button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(EDIT_POST, 'posts', { id:1, timestamp: 1467166872634, title: 'lololol', body: 'some body', author: 'some author', category: 'udacity' })) }}> EDIT </button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(DELETE_POST, 'posts', 1)) }}> DELETE </button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(VOTE_POST, 'posts', { id: 1, option: 'upVote' })) }}> VOTE </button>

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
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(ADD_COMMENT, 'comments', { id:121, parentId: '6ni6ok3ym7mf1p33lnez', timestamp: 1469479767190, body: 'Moar comments.', author: 'thingsix' })) }}> ADD </button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(EDIT_COMMENT, 'comments', { id:121, parentId: '6ni6ok3ym7mf1p33lnez', timestamp: 1469479767190, body: 'Moar comments.', author: 'thingsixtySix' })) }}> EDIT </button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(DELETE_COMMENT, 'comments', 121)) }}> DELETE </button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(VOTE_COMMENT, 'comments', { id: 121, option: 'upVote' })) }}> VOTE </button>
        <ul>
          {this.props.comments.map((comment) => {
            return (
              <li>{`post: ${comment.parentId} Id: ${comment.id} autor: ${comment.author} deletado: ${comment.deleted} voteScore: ${comment.voteScore}`}</li>
            )
          })}
        </ul> */
  );
}

export default App;
