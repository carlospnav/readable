export const POSTS_REQUEST = 'POSTS_REQUEST';
export const GET_POSTS = 'GET_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';
export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const CATEGORIES_REQUEST = 'CATEGORY_REQUEST';
export const GET_CATEGORIES = 'GET_CATEGORIES';

const endpoint = 'http://localhost:5001/';

const makeRequest = (entity) =>{
  entity = entity.toUpperCase();

  return {
    type: `${entity}_REQUEST`
  }
}

// ------------- MAYBE REFACTOR THIS SWITCH.
function receiveEntity(json, actionType, entity, payload){
  let items;

  switch (entity) {
    case 'categories': {
      json = json.categories;

      items = json.reduce((items, item) => {
        let {name} = item;
        items[name] = name
        return items;
      }, {})
      break;
    }

    case 'posts':
    case 'comments':
      items = json.reduce((items, item) => {
        let {id} = item;
        items[id] = {
          ...item
        }
        return items;
      }, {})
    break;

    default: items = [];
  }

  return {
    type:actionType,
    [entity]: items,
    payload,
  }
}

const processEntity = (type, payload) => {
  return {
    payload,
    type
  }
}

const processRequest = (result) => {
  const {entity} = result;
  
  return dispatch => {
    dispatch(makeRequest(entity));
    return result.xhr(dispatch);
  }
}

//for getcomments PAYLOAD = id
const configRequest = (options) => {
  const {actionType, payload, entity} = options;
  const get = (dispatch, {url, xhrInit}) => {

    return fetch(url, xhrInit)
      .then(response => response.json())
      .then(json => dispatch(receiveEntity(json, actionType, entity, payload)))
      .then(() => dispatch(makeRequest(entity)));
  }
  const send = (dispatch, {url, xhrInit, actionType, payload}) => {
    return fetch(url, xhrInit)
      .then((response) => {
        dispatch(processEntity(actionType, payload));
      })
      .then(() => dispatch(makeRequest(entity)));
  }
  const commonXhr = {
    xhrInit:{
      headers:{
        Authorization: 'tievApp'
      }
    },
    actionType,
    payload,
    entity,
    shouldProceed: true
  }

  switch(actionType){
    case GET_POSTS:
    case GET_CATEGORIES: 
      return {
        ...commonXhr,
        url: `${endpoint}${entity}`,
        xhr: function (dispatch) {
          get(dispatch, this);
        }
      };

    case GET_COMMENTS:
      return{
        ...commonXhr,
        url: `${endpoint}posts/${payload}/comments`,
        xhr: function(dispatch){
          get(dispatch, this);
        }
      };

    case ADD_POST:
    case ADD_COMMENT:
      return {
        ...commonXhr,
        xhrInit:{
          ...commonXhr.xhrInit,
          headers: {
            ...commonXhr.xhrInit.headers,
            'content-type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(payload)
        },
        url: `${endpoint}${entity}`,
        xhr: function(dispatch){
          send(dispatch, this);
        }
      };

    case EDIT_POST:
    case EDIT_COMMENT:
      return {
        ...commonXhr,
        xhrInit: {
          ...commonXhr.xhrInit,
          headers: {
            ...commonXhr.xhrInit.headers,
            'content-type': 'application/json'
          },
          method: 'PUT',
          body: JSON.stringify(payload)
        },
        url: `${endpoint}${entity}/${payload.id}`,
        xhr: function(dispatch){
          send(dispatch, this);
        }
      };    

    case DELETE_POST:
    case DELETE_COMMENT:
      return {
        ...commonXhr,
        xhrInit: {
          ...commonXhr.xhrInit,
          method: 'DELETE'
        },
        url: `${endpoint}${entity}/${payload}`,
        xhr: function(dispatch){
          send(dispatch, this);
        }
      };


    case VOTE_POST:
    case VOTE_COMMENT:
      return{
        ...commonXhr,
        xhrInit: {
          ...commonXhr.xhrInit,
          headers:{
            ...commonXhr.xhrInit.headers,
            'content-type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(payload)
        },
        url: `${endpoint}${entity}/${payload.id}`,
        xhr: function(dispatch){
          send(dispatch, this);
        }
      }

    default: {
      return {
        error: 'There is no action with that name.',
        shouldProceed: false
      }
    }
  }
}

const currentlyFetching = (ui, entity) => {
  return ui[entity].isFetching;
}

function shouldProceed(state, entity, actionType, payload) {
  const {ui} = state;

  if (currentlyFetching(ui, entity)) {
    return {
      error: 'A request for that action is still being processed.',
      shouldProceed: false
    }
  }

  return configRequest({actionType, payload, entity});
}

//RETURNS RESULT OBJECT WITH ERROR IF PROBLEM ENCOUNTERED
export const performRequestIfAble = (actionType, entity, payload = null) => {
  return (dispatch, getState) => {

    const result = shouldProceed(getState(), entity, actionType, payload);

    if (result.shouldProceed)
      return dispatch(processRequest(result));

    return result;
  }
}

