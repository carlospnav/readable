import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OrderBySelect from './OrderBySelect';
import PostThumb from './PostThumb';

/* Presentational component that displays the list of posts. It holds
UI properties in the state, while the posts are passed down by the container
component.
*/
class PostsList extends Component{

  constructor(props) {
    super(props);

    this.state = {
      comparer: 'voteScore',
      sortBy: this.sortBy.bind(this)
    }
  }

  /* Redirects to Error Page if post comes null, which indicates
  that the category linked to in the URL does not exist.
  */
  componentWillMount(){
    if (this.props.posts === null)
      this.props.history.push('/categoryError');
  }

  // Sorts by the comparer value in descending order.
  sortBy(a, b){
    const {comparer} = this.state;

    return b[comparer] - a[comparer];
  }

  handleSortBy = (event) => {
    const comparer = event.currentTarget.value;

    this.setState({comparer})
  }

  render(){
    const {posts} = this.props;
    const {sortBy} = this.state;

    return (
      (posts) && (
        <section className="posts-list"> 
          <nav className="posts-list-navigation">
            <OrderBySelect options={['voteScore', 'timestamp']} comparer={this.state.comparer} cb={this.handleSortBy} />
            <Link className="new-post button" to="/create/post">New Post</Link>
          </nav>
          {posts.sort(sortBy).map((post) => (
              <PostThumb key={post.id} post={post} isThumb={true} />
            )
          )}
        </section>
      )
    )
  }
}

export default PostsList;