import { MAKE_POSTS_REQUEST, RECEIVE_POSTS, EDIT_POST } from '../actions';
// import { combineReducers } from 'redux';

export const posts = (state = {}, action) => {

  switch (action.type){
    case MAKE_POSTS_REQUEST: {
      const {uiPosts} = state;
      return {
        ...state,
        uiPosts: {
          ...uiPosts,
          isFetching: true,
        }
      }
    }
      
    case RECEIVE_POSTS: {
        const {receivedAt, posts} = action;
        return {
          ...state,
          posts: {
            ...posts
          },
          uiPosts:{
            isFetching: false,
            lastUpdated: receivedAt,
          }
        }  
      }

    // case ADD_POST: {

    // }
      
    case EDIT_POST: {
        const {editedAt, post} = action;
        const {posts} = state;
        return{
          ...state,
          posts: {
            ...posts,
            [post.id]: post,
          }
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

