import { GET_POSTS_REQUEST, GET_POSTS, EDIT_POST, ADD_POST } from '../actions';
// import { combineReducers } from 'redux';

export const posts = (state = {}, action) => {

  switch (action.type){
    case GET_POSTS_REQUEST: {
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
      const {receivedAt, post} = action;
      const {posts} = state;
      return{
        ...state,
        posts: {
          ...posts,
          [post.id]: post,
        }
      }

    }
      
    case EDIT_POST: {
        const {receivedAt, post} = action;
        const {posts} = state;
        return{
          ...state,
          posts: {
            ...posts,
            [post.id]: post,
          }
        }
      }
    
    // case DELETE_POST: {
    //   const { id } = action.id;

    //   return [
    //     ...state
    //   ].slice(id, 1);
    // }
    
    default:
      return state;
  }
}

