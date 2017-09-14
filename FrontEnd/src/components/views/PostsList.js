import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OrderBySelect from './OrderBySelect';


class PostsList extends Component{
  constructor(props) {
    super(props);

    this.state = {
      comparer: 'voteScore',
      sortBy: this.sortBy.bind(this)
    }
  }

  sortBy(a, b){
    const {comparer} = this.state;

    return b[comparer] - a[comparer];
  }

  handleSortBy = (event) => {

    const comparer = event.currentTarget.value;
    this.setState({comparer})
  }

  render(){
    const {posts, voteCb} = this.props;
    const {sortBy} = this.state;

    return (
      (posts) && (
        <section className="posts-list"> 
          <nav className="posts-list-navigation">
            <OrderBySelect options={['voteScore', 'timestamp']} comparer={this.state.comparer} cb={this.handleSortBy} />
            <Link className="new-post button" to="/create/post">New Post</Link>
          </nav>
          {posts.sort(sortBy).map((post) => (
              <article key={post.id} className="post">
                <div className="post-header title">
                  <div className="post-vote">
                    <button onClick={() => voteCb({id:post.id , vote:'downVote' })} className="entypo-thumbs-down like-thumbs"></button>
                    <h4>{post.voteScore}</h4>
                    <button onClick={() => voteCb({id:post.id , vote:'upVote' })} className="entypo-thumbs-up like-thumbs"></button>
                  </div>
                  <h3>{`${post.author[0].toUpperCase()}${post.author.slice(1)}`}</h3>
                </div>
                <div className="post-title">
                  <h6>{post.title}</h6>
                </div>
                <div className="post-body">
                  <p>{post.body}</p>
                </div>
                <Link className="new-post button" to={`/edit/post/${post.id}`}>Edit Post</Link>
              </article>
            )
          )}
        </section>
      )
    )
  }
}

export default PostsList;