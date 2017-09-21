import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { performRequestIfAble, GET_COMMENTS,  VOTE_COMMENT, DELETE_POST, VOTE_POST } from '../../actions'
import PostThumb from '../views/PostThumb';
import Comment from '../views/Comment';

const COMMENTS = 'comments';
const POSTS = 'posts';

class UnrouteredPostDetailContainer extends Component{

  static propTypes = {
    history: Proptypes.object.isRequired
  }
  componentDidMount(){
    this.props.dispatch(performRequestIfAble(GET_COMMENTS, COMMENTS, this.props.match.params.id));
  }

  handleVote = ({id, type, vote}) => {
    switch(type){
      case POSTS:
        this.props.dispatch(performRequestIfAble(VOTE_POST, POSTS, {id, option: vote}));
        break;
      case COMMENTS:
        this.props.dispatch(performRequestIfAble(VOTE_COMMENT, COMMENTS, {id, option: vote}));
        break;
      default:
      break;
    }
  }

  deletePost = id => {
    this.props.dispatch(performRequestIfAble(DELETE_POST, POSTS, id));
    this.props.history.push('/category');
  }

  getCommentsArr(){
    const {comments, match} = this.props;
    const {id} = match.params;

    return Object.keys(comments).map((key) => comments[key])
      .filter((comment) => comment.parentId === id);
  }

  render() {
    const {posts, match} = this.props;
    const post = posts[match.params.id];
    const commentsArr = this.getCommentsArr();

    return (
      <section className="post-detail-container">
        <nav className="return-container">
          <Link className="return-button button" to="/category">Return</Link>
        </nav>
        {(post) && (   
          <PostThumb key={post.id} post={post} isThumb={false} handleVote={this.handleVote} deletePost={this.deletePost} />
        )}
        <div className="comments">
          {(commentsArr.length > 0) && (
            commentsArr.map((comment) => (
                <Comment key={comment.id} comment={comment} handleVote={this.handleVote} />
              )
            )
          )}
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  const {posts, comments} = state;

  return {
    posts,
    comments,
  }
}

const PostDetailContainer = withRouter(UnrouteredPostDetailContainer);
export default connect(mapStateToProps)(PostDetailContainer);