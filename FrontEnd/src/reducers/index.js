import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions';
// import { combineReducers } from 'redux';

export const posts = (state = {}, action) => {

  switch (action.type){
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_POSTS:
      {
        const {receivedAt, posts} = action;
        return {
          ...state,
          isFetching: false,
          lastUpdated: receivedAt,
          posts: posts
        }  
      }
      
    // case BEGIN_POST: {
    //   const { isFetching } = action;
    //   return {
    //     isFetching: isFetching,
    //     ...state,
    //   }
    // }
    // case ADD_POST: {
    //   let id = state.length;
    //   const {title, body, author} = action;
      
    //   return [
    //     ...state,
    //     {
    //       id: id,
    //       title,
    //       body,
    //       author,
    //       voteScore: 1,
    //       deleted: false
    //     }
    //   ]
    // }
    // case EDIT_POST: {

    //   return[
    //     ...state,
    //     {

    //     }
      
    //   ]
    // }
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

