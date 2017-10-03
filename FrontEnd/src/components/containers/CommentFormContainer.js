import React, { Component } from 'react';
import CommentForm from '../views/CommentForm';

class CommentFormContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comment: {}
    }
  }

  handleChange = (field, value) => {
    const { comment } = this.state;

    this.setState({
      comment: {
        ...comment,
        [field]: value
      }
    })
  }

  render(){
    const {comment} = this.state;

    return (
      <CommentForm comment={comment} cbs={{handleChange: this.handleChange}}/>
    )
  }
}

export default CommentFormContainer;