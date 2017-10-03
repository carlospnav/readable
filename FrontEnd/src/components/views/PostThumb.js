import React from 'react';
import { Link } from 'react-router-dom';

const POSTS = 'posts';

const PostThumb = ({post, isThumb, handleVote, deletePost}) => {

  const className = (isThumb) ? 'post-thumb' : 'post-detail'; 

  return (
    <article className={`entity ${className}`}>
      <div className="post-header title">
        <div className="vote post-vote">
          {(!isThumb) && (
            <button onClick={() => handleVote({id:post.id , type: POSTS, vote:'downVote' })} className="entypo-thumbs-down like-thumbs"></button>
          )}
          <h4>{post.voteScore}</h4>
          {(!isThumb) && (
            <button onClick={() => handleVote({id:post.id , type: POSTS, vote:'upVote' })} className="entypo-thumbs-up like-thumbs"></button>
          )}
        </div>
        <h3>{`${post.author[0].toUpperCase()}${post.author.slice(1)}`}</h3>
      </div>
      <div className="post-title">
        <h6>{post.title}</h6>
        <div className="content-menu post-menu">
          {(!isThumb) && (
            <Link className="content-icon entypo-pencil" to={`/edit/post/${post.id}`}/>
          )}
          {(!isThumb) && (
            <button className="content-icon entypo-cancel-circled" onClick={() => deletePost(post.id)}/>
          )}
        </div>
      </div>
      <div className="post-body">
        <p>{post.body}</p>
      </div>
      {(isThumb) && (
        <Link className="details-button button" to={`/details/${post.id}`}>Details</Link> /*REWORK THIS!!!! Make it link on the img.*/
      )}
    </article>
  )
}

export default PostThumb;