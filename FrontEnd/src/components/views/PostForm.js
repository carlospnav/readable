import React from 'react';
import { Link } from 'react-router-dom';

const PostForm = ({post = {}, categories}) => {
  const {author, title, body, category} = post;

  return (
    <section className="post-form">
      <form>
        <input className="post-form-input" type="text" defaultValue={author} placeholder="Author..." />
        <input className="post-form-input" type="text" defaultValue={title} placeholder="Title..." />
        <textarea className="post-body-input post-form-input" rows="50" cols="50" defaultValue={body} placeholder="Type your post here..." />
        <h3 className="post-form-label">Post Category</h3>
        <select className="post-form-select" defaultValue={category}>
          {categories.map((category) => {
            return <option key={category} value={category}> {category} </option>
          })}
        </select>
        <input className="form-button button" type="submit" value="Submit" />
        <Link className="form-button button" to="/category">Cancel</Link>
      </form>
    </section>
  )
}

export default PostForm;

// onChange={ (event) => (cb(event)) }
