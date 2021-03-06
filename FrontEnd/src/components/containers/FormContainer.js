import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Proptypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import PostForm from '../views/PostForm'
import { performRequestIfAble, ADD_POST, EDIT_POST} from '../../actions';

const CATEGORIES = 'categories';
const POSTS = 'posts';
const COMMENTS = 'comments';

/* An unroutered form built to Add or Edit a post to Redux's store. 
Before being exported, it is routered in order to allow for redirection
upon completion of the request.
*/
class UnrouteredFormContainer extends Component {

  static propTypes = {
    history: Proptypes.object.isRequired
  }

  constructor(props){
    super(props);

    this.state = {
      entity: this.props.entity || { category: 'react'},
      errors: this.props.errors,
      validationRules: {
        author: {maxLength: 20},
        title: {maxLength: 50},
        body: {maxLength: 250}
      }
    }
  }

  /* If the form required is the Edit version, which can be determined by the fact 
  that the route contains an ID,adds the proper entity to edit to the state, of this 
  controlled Form component.
  */
  componentDidMount(){
    const {id} = this.props.match.params;
    const {type} = this.props;
    const entities = this.props[type];
 
    if (id) { 
      const entity = entities[id];

      this.setState({entity});
    }
  }

  /* Checks whether or not the entity has been loaded into the component
  via Redux's mapStateToProps.
  */
  areLoaded(type){
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
    const {entity, errors} = this.state;

    switch (field) {
      case 'author':
      case 'title':
      case 'body': {
        const errorArr = this.validate(field, value);
        this.setState({ 
          entity: {
            ...entity,
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
          entity:{
            ...entity,
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
    const {type, match} = this.props;
    const {entity} = this.state;
    const {validationRules} = this.state;
    const errors = {};

    //Form validation.
    for (let field of Object.keys(validationRules))
      errors[field] = this.validate(field, entity[field]); //Will be a problem if comments and posts have different fields to validate.

    if (errors['author'].length === 0 && errors['title'].length === 0 && errors['body'].length === 0){
      let newEntity;

      //Routing switch.
      switch(match.path){
        case '/create/post': {
          const currentIds = Object.keys(this.props.posts);
          let id = uuidv4();
          while(currentIds.includes(id)) {
            id = uuidv4();
          }
          debugger
          newEntity = {
            ...entity,
            id: id,
            timestamp: Date.now(),
            deleted: false
          }
          this.props.dispatch(performRequestIfAble(ADD_POST, POSTS, newEntity));
          break;
        }
        case '/edit/post/:id': {
          this.props.dispatch(performRequestIfAble(EDIT_POST, POSTS, entity));
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
    const {categories, type} = this.props;
    const {errors, entity} = this.state;

    const formToReturn = (type === 'posts') ? 
    (<PostForm 
      post={entity}
      categories={Object.keys(categories)}
      errors={errors}
      cbs={{
        handleChange: this.handleChange,
        handleSubmit: this.handleSubmit}}
    />) :
     (<PostForm //CHANGE TO COMMENTS FORM
     post={entity}
     categories={Object.keys(categories)}
     errors={errors}
     cbs={{
       handleChange: this.handleChange,
       handleSubmit: this.handleSubmit}}
     />);

    return (
      (this.areLoaded(CATEGORIES) && 
        (formToReturn)
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

const FormContainer = withRouter(UnrouteredFormContainer);
export default connect(mapStateToProps)(FormContainer);