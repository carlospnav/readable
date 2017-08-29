import { EDIT_COMMENT, EDIT_POST, ADD_COMMENT, ADD_POST, DELETE_COMMENT, DELETE_POST } from '../actions';
import { combineReducers } from 'redux';

const post = (state = [], action) => {

  switch (action.type){
    case ADD_POST: {
      let id = state.length;
      const {title, body, author} = action;
      
      return [
        ...state,
        {
          id: id,
          title,
          body,
          author,
          voteScore: 1,
          deleted: false
        }
      ]
    }
    case EDIT_POST: {

      return[
        ...state,
        {

        }
      
      ]
    }
    case DELETE_POST: {
      const { id } = action.id;

      return [
        ...state
      ].slice(id, 1);
    }
    
    default:
      return state;
  }
}

