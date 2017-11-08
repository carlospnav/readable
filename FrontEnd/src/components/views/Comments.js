import React from 'react';
import Comment from './Comment';
import CommentFormContainer from '../containers/CommentFormContainer';
import FormSelector from '../containers/FormSelector';

const Comments= ({comments, handleVote, match}) => {


  return (
    <div className="comments">
      {(comments.length > 0) && (
        comments.map((comment) => (
            <Comment key={comment.id} comment={comment} handleVote={this.handleVote} />
          )
        )
      )}
      <FormSelector entity={{}} match={match} />
      {/* <CommentFormContainer /> */}
    </div>
  )
}

export default Comments;