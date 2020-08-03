// Contains functions for validating input on the BookEditor and BookSearch components
const DataValidator = {
  // Different rules for searching books vs editing/adding, so pass a Boolean to indicate if search rules should be used
  title: function(title, search) {
    let error, errorMessage;
    if(!search && title === '') {
      error = true;
      errorMessage = 'Please enter a title.';
    }
    else if(title.length > 40) {
      error = true;
      errorMessage = 'Please limit to 40 characters.';
    }
    else if(title !== '' && (!/^[a-zA-Z0-9 <>/`'",;:+-_&%#@!\\^$.|?*+()]+$/.test(title))) {
      error = true;
      errorMessage = "You've entered an invalid character.";
    }
    else {
      error = false;
      errorMessage = '';
    }
    return [error, errorMessage];
  },

  author: function(author, search) {
    let error, errorMessage;
    if(!search && author === '') {
      error = true;
      errorMessage = 'Please enter an author.';
    }
    else if(author.length > 25) {
      error = true;
      errorMessage = 'Please limit to 25 characters.';
    }
    else if(/[^a-zA-Z0-9 ']+$/.test(author)) {
      error = true;
      errorMessage = 'Cannot contain special characters.';
    }
    else if(author && !/^([A-Za-z]+),\s([A-Za-z]+)$/.test(author)) {
      error = true;
      errorMessage = 'Please enter as LastName, FirstName.';
    }
    else {
      error = false;
      errorMessage = '';
    }
    return [error, errorMessage];
  },

  length: function(length, search) {
    let error, errorMessage;
    if(length === '' && search){
      error = false;
      errorMessage = '';
      return [error, errorMessage];
    }
    length = Number(length);
    if (isNaN(length)) {
      error = true;
      errorMessage = 'Please enter a number.';
    }
    else if (!Number.isInteger(length)) {
      error = true;
      errorMessage = 'Please enter a whole number.';
    }
    else if (length <= 0 || length >= 10000) {
      error = true;
      errorMessage = 'Must be between 1 and 9999.';
    }
    else {
      error = false;
      errorMessage = '';
    }
    return [error, errorMessage];
  },

  genre: function(genre, search) {
    let error, errorMessage;
    if(!search &&  genre === '') {
      error = true;
      errorMessage = 'Please select a genre.';
    }
    else {
      error = false;
      errorMessage = '';
    }
    return [error, errorMessage];
  },

  audience: function(audience, search) {
    let error, errorMessage;
    if(!search && audience === '') {
      error = true;
      errorMessage = 'Please select an audience.';
    }
    else {
      error = false;
      errorMessage = '';
    }
    return [error, errorMessage];
  }
};

export default DataValidator;
