import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Proptypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import PostForm from '../views/PostForm'
import { performRequestIfAble, GET_CATEGORIES, GET_POSTS , ADD_POST} from '../../actions';

const CATEGORIES = 'categories';
const POSTS = 'posts';

/* An unroutered form built to Add or Edit a post to Redux's store. 
Before being exported, it is routered in order to allow for redirection
upon completion of the request.
*/
class UnrouteredCreateOrEditPostContainer extends Component {

  static propTypes = {
    history: Proptypes.object.isRequired
  }

  constructor(props){
    super(props);

    this.state = {
      post: {
        author: '',
        title: '',
        body: '',
        category: 'react'
      },
      errors: {
        author: [],
        title: [],
        body: []
      },
      validationRules: {
        author: {maxLength: 20},
        title: {maxLength: 50},
        body: {maxLength: 250}
      }
    }
  }

  /* If posts or categories haven't been loaded upon mounting the component,
  loads them into the store and sends them via props to the component, along with
  the post to edit if such is the case.
  */
  componentDidMount(){
    const {id} = this.props.match.params;
    const {posts} = this.props;

    if (!this.shouldFetch(CATEGORIES))
      this.props.dispatch(performRequestIfAble(GET_CATEGORIES, CATEGORIES));

    if (!this.shouldFetch(POSTS))
      this.props.dispatch(performRequestIfAble(GET_POSTS, POSTS));

    if (id) {
      const post = posts[id];

      this.setState({post});
    }
  }

  /* Checks whether or not the entity has been loaded into the component
  via Redux's mapStateToProps.
  */
  shouldFetch(type){
    const entity = this.props[type];

    return (Object.keys(entity).length > 0) ? true : false;
  }

  /*
  Validates a specific field in accordance with the rules
  determined in this component's state. Returns an array
  with the error messages.
  */
  validate = (field, value) => {
    const result = [];
    const {maxLength} = this.state.validationRules[field];

    if (typeof value !== 'string')
      result.push(`This field must be a string.`);
    if (value.length > maxLength)
      result.push(`This field must not be longer than ${maxLength} characters.`);
    if (value === '')
      result.push('This field cannot be empty.');

    return result;
  };

  /* Callback to handle the change of the form's input. Validates
  them before adding them to state in case of text fields and simply 
  adds them otherwise.
  */
  handleChange = (field, value) =>{
    const {post, errors} = this.state;

    switch (field) {
      case 'author':
      case 'title':
      case 'body': {
        const errorArr = this.validate(field, value);
        this.setState({ 
          post: {
            ...post,
            [field]: value,
          }, 
          errors: {
            ...errors,
            [field]: errorArr
          }
        });  
        break;
      }
      case 'category':
        this.setState({
          post:{
            ...post,
            [field]: value
          }
        });
        break;

      default:
      console.log('No such field to validate.');
      break;
    }
  }

  /* Callback to handle submitting the form. Validates each field, adding the
  error object to state and stopping submission of the form if an error has occured, checks 
  for the route to determine which Redux Action to dispatch and redirects to main page upon
  completion of the request.
  */
  handleSubmit = (event) =>{
    event.preventDefault();
    const {post} = this.state;
    const {posts, match} = this.props;
    const {validationRules} = this.state;
    const errors = {};

    //Form validation.
    for (let field of Object.keys(validationRules))
      errors[field] = this.validate(field, post[field]);

    if (errors['author'].length === 0 && errors['title'].length === 0 && errors['body'].length === 0){
      let newPost;

      //Routing switch.
      switch(match.path){
        case '/create/post': {
          const currentIds = Object.keys(posts);
          let id = uuidv4();

          while(currentIds.includes(id)) {
            id = uuidv4();
          }
          newPost = {
            ...post,
            id: id,
            timestamp: Date.now(),
            votescore: 1,
            deleted: false
          }
          this.props.dispatch(performRequestIfAble(ADD_POST, POSTS, newPost));
          break;
        }
        default:
          console.log('What? How? How did you get here? I don\'t understand.');
          break;
      }
      //Redirection to main page.
      this.props.history.push('/category');
    }
    else {
      this.setState({errors});
    }
  }

  render() {
    const {categories} = this.props;
    const {errors, post} = this.state;

    return (
      (this.shouldFetch(CATEGORIES)) && (
        <PostForm 
          post={post} 
          categories={Object.keys(categories)} 
          errors={errors}
          cbs={{handleChange: this.handleChange,
                handleSubmit: this.handleSubmit}} 
        />
      )
    )
  }
}

const mapStateToProps = (state) => {
  const {posts, categories} = state;

  return {
    posts,
    categories
  }
}

const CreateOrEditPostContainer = withRouter(UnrouteredCreateOrEditPostContainer);
export default connect(mapStateToProps)(CreateOrEditPostContainer);