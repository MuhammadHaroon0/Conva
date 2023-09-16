const lodash= require('lodash');

export const deepCopy= function (input) {
    if (Array.isArray(input)) {
      // If it's an array, create a new array and copy its elements recursively
      return input.map((item) => deepCopy(item));
    } else if (typeof input === 'object' && input !== null) {
      // If it's an object, create a new object and copy its properties recursively
      const newObj = {};
      for (const key in input) {
        if (input.hasOwnProperty(key)) {
          newObj[key] = deepCopy(input[key]);
        }
      }
      return newObj;
    } else {
      // If it's a primitive value (string, number, etc.), return it as-is
      return input;
    }
  }


  export const  deepCopyWithAddition=function(input, elementToAdd) {
    //   console.log(input);
    // const newArr=lodash.cloneDeep(input)
    // newArr.push(elementToAdd)
    // return newArr

    const temp=lodash.cloneDeep(input)
      // const res=newArr.findIndex(item=>item.receiver===elementToAdd.receiver)
      // if(res===-1)
      // {
      //   newArr.push(elementToAdd)
      // }
      // else
      // {
      //   newArr[res].messages.push(elementToAdd.messages[elementToAdd.messages.length-1])
      // }
      if(temp)
      temp.messages.push(input)
      return temp

    
  }
