import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OrderBySelect from './OrderBySelect';


class PostsList extends Component{
  constructor(props) {
    super(props);

    this.state = {
      comparer: 'voteScore',
      sortBy: this.sortBy.bind(this),
      handleSortBy: this.handleSortBy.bind(this)
    }
  }

  sortBy(a, b){
    const {comparer} = this.state;

    return b[comparer] - a[comparer];
  }

  handleSortBy(event){

    const comparer = event.currentTarget.value;
    this.setState({comparer})
  }

  render(){
    const {posts} = this.props;
    const {sortBy, handleSortBy} = this.state;

    return (
      (posts) && (
        <section className="posts-list"> 
          <nav className="posts-list-navigation">
            <OrderBySelect options={['voteScore', 'timestamp']} comparer={this.state.comparer} cb={handleSortBy} />
            <Link className="new-post button" to="/post">New Post</Link>
          </nav>
          {posts.sort(sortBy).map((post) => (
              <article className="post">
                <div className="post-header title">
                  <h3>{`${post.author[0].toUpperCase()}${post.author.slice(1)}`}</h3>
                </div>
                <div className="post-title">
                  <h6>{post.title}</h6>
                </div>
                <div className="post-body">
                  <p>{post.body}</p>
                </div>
              </article>
            )
          )}
        </section>
      )
        /* <OrderBySelect options={['voteScore', 'timestamp']} comparer={this.state.comparer} cb={handleSortBy} />
        <button>New Post</button>
        {(posts) && (posts.sort(sortBy).map((post) => {
            return (
              <article>
                <h3>{post.title}</h3>
                <h6>{post.author}</h6>
                <p>{post.body}</p>
                <h1>{post.voteScore}</h1>
              </article>
            )
          }))
        } */

    )
  }
}

export default PostsList;