import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Root from './components/views/Root';
import CategoryError from './components/error/CategoryError';

const App = ({match}) => {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <Redirect to="/category" />
        )} />

        <Route exact path="/category" component={Root} />
        <Route path="/category/:category" component={Root} />
        <Route exact path="/categoryError" component={CategoryError} />

        <Route exact path="/edit" render={() => (
          <div>EDITADO</div>
        )} />
        {/* <Route path="/category" /> */}
      </div>
      /*<p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(GET_POSTS, 'posts')) }} >INIT</button>
        <button onClick={ () => { this.props.dispatch(performRequestIfAble(ADD_POST, 'posts', { id:1, timestamp: 1467166872634, title: 'some title', body: 'some body', author: 'some author', category: 'udacity' })) }}> ADD </button>
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

// const mapStateToProps = (state) => {
//   let {posts, comments} = state;
//   const ObjToArr = (entity) => {
//     entity ?
//       entity = Object.keys(entity).map((entityId) => {
//         return entity[entityId];
//       }) :
//       entity = [];
//     return entity;
//   };

//   return {
//     posts: ObjToArr(posts),
//     comments: ObjToArr(comments),
//   }
// }

// export default connect(mapStateToProps)(App);

export default App;
