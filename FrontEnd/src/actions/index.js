export const POSTS_REQUEST = 'POSTS_REQUEST';
export const GET_POSTS = 'GET_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

const endpoint = 'http://localhost:5001/';


// class Entry {
//   constructor(body, author){
//     this.body = body;
//     this.author = author;
//   }
// }

// class Post extends Entry{
//   constructor(title, body, author){
//     super(body, author);
//     this.title = title;
//   }
// }

// class Comment extends Entry{
//   constructor(body, author){
//     super(body, author);
//   }
// }

//NEEDS RECEIVED AT
const makeRequest = (entity) =>{
  entity = entity.toUpperCase();

  return {
    type: `${entity}_REQUEST`
  }
}

// -------------
function receiveEntity(json, actionType, entity, payload){
  const items = json.reduce((items, item) => {
    let {id} = item;
    items[id] = {
      ...item
    }
    return items;
  }, {})

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
      return {
        ...commonXhr,
        url: `${endpoint}posts`,
        xhr: function (dispatch) {
          get(dispatch, this);
        }
      };

    case ADD_POST: 
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
        url: `${endpoint}posts`,
        xhr: function(dispatch){
          send(dispatch, this);
        }
      };

    case EDIT_POST:
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
        url: `${endpoint}posts/${payload.id}`,
        xhr: function(dispatch){
          send(dispatch, this);
        }
      };

    case DELETE_POST:
      return {
        ...commonXhr,
        xhrInit: {
          ...commonXhr.xhrInit,
          method: 'DELETE'
        },
        url: `${endpoint}posts/${payload}`,
        xhr: function(dispatch){
          send(dispatch, this);
        }
      };
    
    case GET_COMMENTS:
      return{
        ...commonXhr,
        url: `${endpoint}posts/${payload}/comments`,
        xhr: function(dispatch){
          get(dispatch, this);
        }
      }
    
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
        body: JSON.stringify(payload),
      },
      url: `${endpoint}comments`,
      xhr: function(dispatch){
        send(dispatch, this);
      }
    }

    case EDIT_COMMENT:
    return{
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
      url: `${endpoint}comments/${payload.id}`,
      xhr: function(dispatch){
        send(dispatch, this);
      }
    }

    case DELETE_COMMENT:
    return{
      ...commonXhr,
      xhrInit: {
        ...commonXhr.xhrInit,
        method: 'DELETE'
      },
      url: `${endpoint}comments/${payload}`,
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

