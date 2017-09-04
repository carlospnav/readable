export const MAKE_POSTS_REQUEST = 'MAKE_POSTS_REQUEST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const EDIT_POST = 'EDIT_POST';

const REQUEST_POST = 'REQUEST_POST', REQUEST_EDIT = 'REQUEST_EDIT', REQUEST_POST = 'REQUEST_ADD';

// export const ADD_POST = 'ADD_POST';
// export const EDIT_POST = 'EDIT_POST';
// export const DELETE_POST = 'DELETE_POST';
// export const GET_POSTS = 'GET_POSTS';
// export const ADD_COMMENT = 'ADD_COMMENT';
// export const EDIT_COMMENT = 'EDIT_COMMENT';
// export const DELETE_COMMENT = 'DELETE_COMMENT';
// export const PROCESS_POST = 'PROCESS_POST';

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

const makePostsRequest = () =>{
  return {
    type: MAKE_POSTS_REQUEST
  }
}

function receivePosts(json) {
  const posts = json.reduce((posts, post) => {
    let {id} = post;
    posts[id] = {
      ...post 
    }
    return posts;
  }, {})

  return {
    type: RECEIVE_POSTS,
    posts: posts,
    receivedAt: Date.now()
  }
}

function fetchPosts() {
  return dispatch => {
    const url = 'http://localhost:5001/posts'
    const postInit = {
      headers: {
        Authorization: 'tievApp'
      }
    }

    dispatch(makePostsRequest())
    return fetch(url, postInit)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}



// const editPost = (post) => {
//   return dispatch => {
//     const url = `http://localhost:5001/posts/${post.id}`;
//     const postInit = {
//       method: 'PUT',
//       headers: {
//         Authorization: 'tievApp'
//       },
//       data: post
//     }
//   }
// }

function shouldProceed(state, mode, payload) {
  const { isFetching } = state.uiPosts;
  const { posts } = state;
  const result = {};

  result.shouldProceed = (isFetching) ?  false : true;

  switch(mode){
    case REQUEST_POST: {
      result.cb = fetchPosts;
      break;
    }
    case REQUEST_EDIT: {
      // result.cb = editPosts;

      if (!payload instanceof Post || !Object.keys(posts).includes(payload.id))
        result.shouldProceed = false;
    }
    case REQUEST_ADD: {
      const validPost = isPostValid(payload);

      result.cb = addPosts;
      if (!validPost && Object.keys(posts).includes(payload.id))
        result.shouldProceed = false;
    }
  }

  return result;
}


export const performRequestIfNeeded = (mode, payload = null) => {
  return (dispatch, getState) => {
    const result = shouldProceed(getState(), mode, payload);

    if (result.shouldProceed) 
      return dispatch(result.request(payload));
    else
      console.log('ERROR ERROR') //ADD ERROR RESOLUTION.
  }
}
//REFACTOR FOLLOWING FUNCTIONS TO AVOID DUPLICATION
export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldProceed(getState(), REQUEST_POST)) {
      return dispatch(fetchPosts())
    }
  }
}



export const createPostIfAble = post => {
  return (dispatch, getState) => {
    if (shouldProceed(getState(), REQUEST_ADD, post)){
      return dispatch(addPost(post))
    }
  }
}

// export const editPostIfAble = (post) => {
//   return (dispatch, getState) => {
//     if (shouldProceed(getState(), EDIT, post))
//       return dispatch(editPost(post))
//     else
//       console.log('BADBAD'); //IMPLEMENT ERRORMESSAGE -> Maybe redux error log?
//   } 
// }

// export const addPost = ({title, body, author, category}) => {
//   let post = new Post(title, body, author, category);

//   return {
//     ...post,
//     type: ADD_POST
//   }
// }

// export const editPost = ({title, body, author, category}) => {
//   let post = new Post(title, body, author);

//   return{
//     ...post,
//     category,
//     type: EDIT_POST
//   }
// }

// export const deletePost = ({id}) => {
  
//   return {
//     type: DELETE_POST,
//     id
//   }
// }


// export const addComment = ({body, author}) => {
//   let comment = new Comment(body, author);

//   return {
//     ...comment,
//     type: ADD_COMMENT
//   }
// }

// export const editComment = ({body, author}) => {
//   let comment = new Comment(body, author);

//   return {
//     ...comment,
//     type: EDIT_COMMENT
//   }
// }

// export const deleteComment = ({id, parentId}) => {

//   return {
//     type: DELETE_COMMENT,
//     id,
//     parentId
//   }
// }

// export const sendPost = () => {
//   return {
//     type: SEND_POST,
//     isFetching: true
//   }
// }

// export const processPost = (post) => {

//   const query = Object.keys(post)
//                   .map( param => encodeURIComponent(param) + '=' + encodeURIComponent(post[param]))
//                   .join('&');

//   const url = 'http://localhost:5001/posts?' + query;
//   const postInit = {
//     method: 'POST',
//     headers: {
//       Authorization: 'tievApp'
//     },

//   }

//   return (dispatch) => {
//     dispatch(sendPost());

//     return fetch(url).then(() => {
//       dispatch(addPost(post));
//     })
//   }
// }
