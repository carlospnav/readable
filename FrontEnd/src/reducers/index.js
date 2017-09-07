import { POSTS_REQUEST, GET_POSTS, EDIT_POST, ADD_POST, DELETE_POST } from '../actions';
// import { combineReducers } from 'redux';

/*
  Posts Reducer. Contains:
  Request
  GetAll
  Create
  Edit
  Delete
 */
export const posts = (state = {}, action) => {
  switch (action.type){

    /*
      Updates UI entity with a flag for posts being processed.
      Avoids multiple requests being sent until the last request is processed.
    */
    case POSTS_REQUEST: {
      const {ui} = state;
      return {
        ...state,
        ui: {
          ...ui,
          posts: {
            ...ui.posts,
            isFetching: true
          }
        }
      }
    }
     
    //Fetches all posts.
    case GET_POSTS: {
        const {receivedAt, posts} = action;
        const {ui} = state;
        return {
          ...state,
          posts: {
            ...posts
          },
          ui:{
            ...ui,
            posts: {
              isFetching: false,
              lastUpdated: receivedAt,
            }
          }
        }  
      }

    //Creates a post.
    case ADD_POST: { 
      const { payload } = action;
      const { posts } = state;
      return{
        ...state,
        posts: {
          ...posts,
          [payload.id]: payload,
        }
      }

    }
      
    //Edits a post.
    case EDIT_POST: {
        const {payload} = action;
        const {posts} = state;
        return{
          ...state,
          posts: {
            ...posts,
            [payload.id]: payload,
          }
        }
      }

    /*
      Deletes a post. Payload is the Id of the post to
      be deleted 
    */
    case DELETE_POST: {
      const{payload} = action;
      const{posts} = state;
      
      return{
        ...state,
        posts:{
          ...posts,
          [payload]: {
            ...posts[payload],
            deleted: true
          }
        }
      }
    }
    
    default:
      return state;
  }
}

