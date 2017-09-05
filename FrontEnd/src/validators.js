const POST = 'POST';
const COMMENT = 'COMMENT';





const areRequiredPropertiesNonEmpty = (propertiesArr) => {
  for (let property of propertiesArr) {
    if ((!property)
        ||
      (property === '')) 
        return false;

    return true;
  }
}

const getPropertiesToCheck = ({payload, type}) => {
  const properties, result = {};

  switch(type){
    case POST:{
      properties = {
        textProps: ['title', 'author', 'body', 'category'],
        uniqueProp: ['id'],
        approvedProp: ['category']
      }
      break;
    }
    case COMMENT:{
      properties = {
        textProps: ['author', 'body'],
        uniqueProp: ['id'],
        nonUniqueProp: ['parentId']
      }
      break;
    }
    default:
      //SHOULD RETURN ERRROR!
      break;
  }

  for (let property of Object.keys(properties)) {
    result[property] = properties[property].reduce((accumulator, val) => { 
      accumulator[val] = payload[val];
      return accumulator;
    }, {});
  }
}

const areTextFieldsString = (checkBundle) => {
  const {textProps} = getPropertiesToCheck(checkBundle);

    for (let textProp of textProps) {
      const{value} = textProp;
      if (typeof value !== 'string') {
        return {
          value: false,
          error: 'This field must be text'
        };
    }
  }
  return {
    value: true,
  };
}

const getAssessments = (type) => {
  const commonAssessments = [areTextFieldsString, areTextFieldsNonEmpty, areTextFieldsMaximumLength, areIdFieldsUnique],
        postAssessments = [doesCategoryExist],
        commentAssessments = [areParentIdFieldsNonUnique];

  switch (type) {
    case POST: {
      return commonAssessments.concat(postAssessments);
    }
    case COMMENT: {
      return commentAssessments.concat(commentAssessments);
    }
    default:
      return commonAssessments;
  }
}

const areAllFieldsValid = (checkBundle) => {
  const {type} = checkBundle,
    assessments = getAssessments(type),
    resultBundle = {};

  assessments.forEach((assessment) => {
    resultBundle[assessment.name] = assessment(checkBundle);
  })
  return resultBundle;
}


//THESE RETURN OBJ WITH BOOLEAN VALUE PROPERTY AND ERROR PROPERTY IF PRESENT.

export const isPostValid = (post) => {
  return areAllFieldsValid({
    payload: post,
    type: POST
  });
}

export const isCommentValid = (comment) => {
  return areAllFieldsValid({
    payload: comment,
    type: COMMENT
  });
}