import { POSTS_REQUEST, GET_POSTS, EDIT_POST, ADD_POST, DELETE_POST, VOTE_POST, COMMENTS_REQUEST, GET_COMMENTS, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, VOTE_COMMENT, CATEGORIES_REQUEST, GET_CATEGORIES } from '../actions';
import { combineReducers } from 'redux';



/*
  UI Reducer.
  Updates UI entities with a flag for processing. 
  Avoids multiple requests being sent until the last request is processed.
  Contains:
  POSTS_REQUEST
  COMMENTS_REQUEST
  CATEGORIES_REQUEST
 */
const ui = (state = {}, action) => {
  switch (action.type){

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

    case COMMENTS_REQUEST: {
      const {comments} = action;
      const{isFetching} = state['comments'];

      return {
        ...state,
        comments: {
          ...comments,
          isFetching: !isFetching
        }
      }
    }

    case CATEGORIES_REQUEST: {
      const {categories} = action;
      const {isFetching} = state['categories'];

      return {
        ...state,
        categories: {
          ...categories,
          isFetching: !isFetching
        }
      }
    }

    default:
      return state;
  }
}

const categories = (state = {}, action) => {
  switch (action.type){
    case GET_CATEGORIES: {
      const {categories} = action;

      return {
        ...categories,
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
        [payload.id]: {
          ...payload,
          voteScore: 1,
          deleted: false
        }
      }
    }
      
    //Edits a post.
    case EDIT_POST: {
        const {payload} = action;

        return{
          ...state,
          [payload.id]: {
            ...state[payload.id],
            ...payload
          }
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

    case VOTE_POST: {
      const{id, option} = action.payload;
      let score = state[id].voteScore;

      return{
        ...state,
        [id]: {
          ...state[id],
          voteScore: (option === 'upVote') ? ++score : --score
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


      const previousComments = Object.values(state).reduce((items, item) => {
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

    case ADD_COMMENT: {
      const {payload} = action;

      return {
        ...state,
        [payload.id]: {
          ...payload,
          voteScore: 1,
          deleted: false,
          parentDeleted: false
        }
      }
    }

    case EDIT_COMMENT: {
      const {payload} = action;

      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          ...payload 
        }
      }
    }

    case DELETE_COMMENT: {
        const {payload} = action;
        
        return{
          ...state,
          [payload]: {
            ...state[payload],
            deleted: true
          }
        }
      }

      case VOTE_COMMENT: {
        const{id, option} = action.payload;
        let score = state[id].voteScore;
  
        return{
          ...state,
          [id]: {
            ...state[id],
            voteScore: (option === 'upVote') ? ++score : --score
          }
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
  categories,
});

