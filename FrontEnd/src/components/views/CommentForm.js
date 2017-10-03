import React from 'react';

const CommentForm = ({comment, cbs}) => {
  const {author, body} = comment;
  const {handleChange} = cbs;

  return (
    <form className="new-comment-form">
      <input className="new-comment-title new-comment" value={author} onChange={(e) => handleChange('author', e.currentTarget.value)} type="text" placeholder="Title..." />
      <textarea className="new-comment-body new-comment" value={body} onChange={(e) => handleChange('body', e.currentTarget.value)} placeholder="Type your comment here..."/>
      <input type="submit" className="new-comment-submit new-comment" />
    </form>
  )
}

export default CommentForm;