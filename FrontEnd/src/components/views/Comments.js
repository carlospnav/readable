import React from 'react';
import Comment from './Comment';
import CommentFormContainer from '../containers/CommentFormContainer';

const Comments= ({comments, handleVote}) => {


  return (
    <div className="comments">
      {(comments.length > 0) && (
        comments.map((comment) => (
            <Comment key={comment.id} comment={comment} handleVote={this.handleVote} />
          )
        )
      )}
      <CommentFormContainer />
    </div>
  )
}

export default Comments;