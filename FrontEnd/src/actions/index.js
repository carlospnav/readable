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
  const Authorization = 'tievApp';
  switch(actionType){
    case GET_POSTS: 
      return {
        xhrInit: {
          method: 'GET',
          headers: {
            Authorization
          }
        },
        actionType: GET_POSTS,
        url: `${endpoint}posts`,
        payload: null,
        entity: 'posts',
        xhr: function(dispatch) {
          return fetch(this.url, this.xhrInit)
                  .then(response => response.json())
                  .then(json => dispatch(receivePosts(json)))
        },
        shouldProceed: true
      }

    case ADD_POST: 
      return {
        xhrInit: {
          headers: {
            Authorization,
            'content-type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(payload)
        },
        actionType,
        url: `${endpoint}posts`,
        payload,
        entity,
        xhr: function(dispatch) {
              return fetch(this.url, this.xhrInit)
                      .then(response => {
                        dispatch(processPost(this.actionType, this.payload));
                      })
        },
        shouldProceed: true
      }
    case EDIT_POST:
      return {
        xhrInit: {
          headers: {
            Authorization,
            'content-type': 'application/json'
          },
          method: 'PUT',
          body: JSON.stringify(payload)
        },
        actionType,
        url: `${endpoint}posts/${payload.id}`,
        payload,
        entity,
        xhr: function(dispatch){
          return fetch(this.url, this.xhrInit)
                  .then(response => {
                    dispatch(processPost(this.actionType, this.payload))
                  })
        },
        shouldProceed: true
      }
    case DELETE_POST:
      return {
        xhrInit: {
          headers: {
            Authorization
          },
          method: 'DELETE'
        },
        actionType,
        url: `${endpoint}posts/${payload}`,
        entity,
        payload,
        xhr: function(dispatch){
          return fetch(this.url, this.xhrInit)
                  .then(response => {
                    dispatch(processPost(this.actionType, this.payload))
                  })
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
      return dispatch(processRequest(configRequest(result)));

    return result;
  }
}

