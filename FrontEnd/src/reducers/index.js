import { POSTS_REQUEST, GET_POSTS, EDIT_POST, ADD_POST, DELETE_POST, COMMENTS_REQUEST, GET_COMMENTS } from '../actions';
import { combineReducers } from 'redux';


/*
  UI Reducer. Contains:
  POSTS_REQUEST
  COMMENTS_REQUEST
 */
const ui = (state = {}, action) => {
  switch (action.type){

    /*
      Updates UI entity with a flag for posts being processed.
      Avoids multiple requests being sent until the last request is processed.
    */
    case POSTS_REQUEST: {
      const {posts} = action;
      const {isFetching} = state['posts'];

      return {
        ...state,
        posts: {
          ...posts,
          isFetching: !isFetching
        }
      }
    }

    /*
      Updates UI entity with a flag for comments being processed.
      Avoids multiple requests being sent until the last request is processed.
    */
    case COMMENTS_REQUEST: {
      const {comments} = state;

      return {
        ...state,
        comments: {
          ...comments,
          isFetching: true
        }
      }
    }

    default:
      return state;
  }
}

/*
  Posts Reducer. Contains:
  GetAll
  Create
  Edit
  Delete
 */
const posts = (state = {}, action) => {
  switch (action.type){
    //Fetches all posts.
    case GET_POSTS: {
        const {posts} = action;

        return {
          ...posts,
        }  
      }

    //Creates a post.
    case ADD_POST: { 
      const { payload } = action;
      
      return{
        ...state,
        [payload.id]: payload,
      }
    }
      
    //Edits a post.
    case EDIT_POST: {
        const {payload} = action;

        return{
          ...state,
          [payload.id]: payload,
        }
      }

    /*
      Deletes a post. Payload is the Id of the post to
      be deleted 
    */
    case DELETE_POST: {
      const{payload} = action;
      
      return{
        ...state,
        [payload]: {
          ...state[payload],
          deleted: true
        }
      }
    }
    
    default:
      return state;
  }
}

/*
  Comments Reducer. Contains:
  GetAll
 */
const comments = (state = {}, action) => {
  switch(action.type){

    case GET_COMMENTS: {
      const {comments, payload} = action;

      const previousComments = Object.values(state.comments).reduce((items, item) => {
        if (item.parentId !== payload)
          items[item.id] = item;
        return items;
      }, {});

      const newComments = {
        ...previousComments,
        ...comments
      }

      return {
        ...newComments,
      }  
    }

    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments,
  ui,
});

