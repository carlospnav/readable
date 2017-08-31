export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

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

const requestPosts = () =>{
  return {
    type: REQUEST_POSTS
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

    dispatch(requestPosts())
    return fetch(url, postInit)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}

function shouldFetchPosts(state) {
  const { posts, isFetching } = state;
  console.log('deciding whether I should fetch.')
  if (!posts) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return true
  }
}

export function fetchPostsIfNeeded() {
  console.log('trying to fetch!')
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts())
    }
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
