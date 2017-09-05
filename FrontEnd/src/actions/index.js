export const GET_POSTS_REQUEST = 'MAKE_POSTS_REQUEST';
export const GET_POSTS = 'GET_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const ADD_POST = 'ADD_POST';

const REQUEST_POST = 'REQUEST_POST', REQUEST_EDIT_POST = 'REQUEST_EDIT_POST', REQUEST_ADD_POST = 'REQUEST_ADD_POST';
const URL = 'http://localhost:5001/';

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

const makeRequest = (type) =>{
  return {
    type: `${type}_REQUEST`
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

const addPost = (post) => {
  return{
    type: ADD_POST,
    post: post,
    receivedAt: Date.now()
  }
}

//-----------
function fetchPosts() {
  return dispatch => {
    const postInit = {
      headers: {
        Authorization: 'tievApp'
      }
    }
    const url = `${URL}posts`;
    dispatch(makeRequest(GET_POSTS));
    return fetch(url, postInit)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)));
  }
}

const processPost = (post) => {
  return dispatch => {
    const postInit = {
      headers: {
        Authorization: 'tievApp',
        'content-type': 'application/json' 
      },
      method: "POST",
      body: JSON.stringify(post)
    }
    const url = `${URL}posts`;
    dispatch(makeRequest(ADD_POST));
    return fetch(url, postInit)
      .then(response => {
        dispatch(addPost(post))
      });
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


//TRY REFACTOR ISFETCHING REPETITION.

function shouldProceed(state, mode) {
  const result = {};
  const {ui} = state;
  let isFetching;
  
  switch(mode){
    case GET_POSTS: {
      isFetching = ui.posts.isFetching;
      result.request = fetchPosts;
      break;
    }
    case ADD_POST: {
      isFetching = ui.posts.isFetching;
      result.request = processPost;
      break;
    }
    // case REQUEST_EDIT: {
    //   isFetching = ui.posts.isFetching;
    //   result.cb = editPosts;
    //   break;
    // }

    default: {
      result.shouldProceed = false;
      result.error = 'There is no action with that name.';
      return result;
    }
  }
  
  if (!isFetching) {
    result.shouldProceed = true;
    return result;
  }
  console.log('opa, muitos cliques.');
  result.shouldProceed = false;
  return result;
}

//RETURNS RESULT OBJECT WITH ERROR IF PROBLEM ENCOUNTERED.
export const performRequestIfAble = (mode, payload = null) => {
  return (dispatch, getState) => {
    const result = shouldProceed(getState(), mode);

    if (result.shouldProceed) 
      return dispatch(result.request(payload));
    return result;
  }
}

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
