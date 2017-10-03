import React from 'react';
const COMMENTS = 'comments';

const Comment = ({comment, handleVote}) => {

  return (
    <article className="entity comments">
      <div className="comment-author">
        <h3>{comment.author}</h3>
        <div className="content-menu">
          <button className="entypo-pencil content-icon"> </button>
          <button className="entypo-cancel-circled content-icon"> </button>
          <div className="vote comment-vote">
            <button onClick={() => handleVote({id:comment.id , type: COMMENTS , vote:'downVote' })} className="entypo-thumbs-down like-thumbs"></button>
            <h4>{comment.voteScore}</h4>
            <button onClick={() => handleVote({id:comment.id , type: COMMENTS , vote:'upVote' })} className="entypo-thumbs-up like-thumbs"></button>
          </div>
        </div>
      </div>
      <div className="comment-body">
        <h3>{comment.body}</h3>
      </div>
    </article>
  )
}

export default Comment;