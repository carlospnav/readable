import React, { Component } from 'react';
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
        <section> 
          <OrderBySelect options={['voteScore', 'timestamp']} comparer={this.state.comparer} cb={handleSortBy} />
          <button>New Post</button>
          {posts.sort(sortBy).map((post) => (
              <article>
                <h3>{post.title}</h3>
                <h6>{post.author}</h6>
                <p>{post.body}</p>
                <h1>{post.voteScore}</h1>
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