import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormSet from './FormSet';

class PostForm extends Component{

  render(){
    const {post, categories, errors} = this.props;
    const {author, title, body, category} = post;
    const{handleChange, handleSubmit} = this.props.cbs;

    return (
      <section className="post-form">
        <form onSubmit={ (event) => { handleSubmit(event, post) }}>

          <FormSet config={{
            errorArr: errors.author,
            onChangeHandler: handleChange,
            value: author,
            specialClass: '',
            className: 'post-form-input',
            field:'author', 
            fieldType: 'input',
            placeholder: 'Author...'
          }} />

          <FormSet config={{
            errorArr: errors.title,
            onChangeHandler: handleChange,
            value: title,
            specialClass: '',
            className: 'post-form-input',
            field:'title', 
            fieldType: 'input',
            placeholder: 'Title...'
          }} />

          <FormSet config={{
            errorArr: errors.body,
            onChangeHandler: handleChange,
            value: body,
            specialClass: 'textarea-box',
            className: 'post-body-input ',
            field:'body', 
            fieldType: 'textarea',
            placeholder: 'Type your post here...'
          }} />

          <h3 className="post-form-label">Post Category</h3>
          <select className="post-form-select" defaultValue={category} onChange={(event) => handleChange('category', event.currentTarget.value)}>
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
}

export default PostForm;
