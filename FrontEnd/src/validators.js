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
  const properties = {};

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

  let result2 = Object.keys(properties).reduce((acc1, val1) => {
    acc1[val1] = properties[val1].reduce((acc2, val2) => {
    // acc2[val2] = obj[val2];
    //  }, {});
    // }
  }, {});


  return Object.keys(properties).reduce((accumulator, value) => {
    return value.reduce((acc, val) =>{
      return {
        
      }
    },{});
  }, {});

  return stringArr.reduce((properties, property) => {
    return properties.concat({
      key: property,
      value: payload[property]
    });
  }, []);
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
    value: true
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
 const {type} = checkBundle;
 const assessments = getAssessments(type);
 let checkResult;

  for (let assessment of assessments){
    checkResult = assessment(checkBundle);
    if (!assessment(checkResult.value))
      return checkResult;
  }
  checkResult.value = true;
  return checkResult;
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