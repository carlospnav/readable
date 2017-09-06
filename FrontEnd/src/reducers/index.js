import { POSTS_REQUEST, GET_POSTS, EDIT_POST, ADD_POST, DELETE_POST } from '../actions';
// import { combineReducers } from 'redux';

export const posts = (state = {}, action) => {
  switch (action.type){
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

    /*payload: The ID of the post to be deleted. */
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

