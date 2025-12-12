
export const addTaskValidationSchema = {
   title: {
      notEmpty: {
      errorMessage: "title should be not empty"
      },
      isString:{
         errorMessage: "should be string"
      }
   },
   description: {
      isString:{
         errorMessage: "should be string"
      }
   },
   completed:{
      optional: true
   }
};

