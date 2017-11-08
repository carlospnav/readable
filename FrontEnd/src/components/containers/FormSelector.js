import React from 'react';
import FormContainer from './FormContainer';

const POSTS = 'posts';

const FormSelector = ({entity, match}) => {
  let type, errors = {
    author: [],
    body: []
  }

  const defineType = () => {
    switch(match.path){
      case '/create/post':
      case '/edit/post/:id':
        return POSTS;
      default:
      break;
    }
  }
  type = defineType();

  if (type === 'posts'){
    errors = {
      ...errors,
      title: [],
    }
  }

  return (
    <FormContainer type={type} entity={entity} errors={errors} />
  )
}

export default FormSelector;