export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

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

export const addPost = ({title, body, author, category}) => {
  let post = new Post(title, body, author, category);

  return {
    ...post,
    type: ADD_POST
  }
}

export const editPost = ({title, body, author, category}) => {
  let post = new Post(title, body, author);

  return{
    ...post,
    category,
    type: EDIT_POST
  }
}

export const deletePost = ({id}) => {
  
  return {
    type: DELETE_POST,
    id
  }
}


export const addComment = ({body, author}) => {
  let comment = new Comment(body, author);

  return {
    ...comment,
    type: ADD_COMMENT
  }
}

export const editComment = ({body, author}) => {
  let comment = new Comment(body, author);

  return {
    ...comment,
    type: EDIT_COMMENT
  }
}

export const deleteComment = ({id, parentId}) => {

  return {
    type: DELETE_COMMENT,
    id,
    parentId
  }
}