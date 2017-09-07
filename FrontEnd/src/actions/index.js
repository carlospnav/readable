export const POSTS_REQUEST = 'POSTS_REQUEST';
export const GET_POSTS = 'GET_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';

const endpoint = 'http://localhost:5001/';

class Entry {
  constructor(body, author){
    this.body = body;
    this.author = author;
  }
}

class Post extends Entry{
  constructor(title, body, author){
    super(body, author);
    this.title = title;
  }
}

class Comment extends Entry{
  constructor(body, author){
    super(body, author);
  }
}

const makeRequest = (entity) =>{
  entity = entity.toUpperCase();

  return {
    type: `${entity}_REQUEST`
  }
}

// -------------
function receivePosts(json) {
  const posts = json.reduce((posts, post) => {
    let {id} = post;
    posts[id] = {
      ...post 
    }
    return posts;
  }, {})

  return {
    type: GET_POSTS,
    posts: posts,
    receivedAt: Date.now()
  }
}

const processPost = (type, payload) => {
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

const configRequest = (options) => {
  const {actionType, payload, entity} = options;
  const get = (dispatch, {url, xhrInit}) => {
    return fetch(url, xhrInit)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)));
  }
  const send = (dispatch, {url, xhrInit, actionType, payload}) => {
    return fetch(url, xhrInit)
      .then((response) => {
        dispatch(processPost(actionType, payload));
      });
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
  }

  switch(actionType){
    case GET_POSTS: 
      return {
        ...commonXhr,
        url: `${endpoint}posts`,
        xhr: function (dispatch) {
          get(dispatch, this);
        },
        shouldProceed: true
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
        },
        shouldProceed: true
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
        },
        shouldProceed: true
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
        },
        shouldProceed: true
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

