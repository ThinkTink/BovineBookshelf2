// Component for entering search terms to filtering displayed books
import React, { useState } from 'react';
import { 
  Typography,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  makeStyles
} from '@material-ui/core';
import DataValidator from './DataValidator';

const useStyles = makeStyles({
  card: {
    width: '92%',
    margin: 'auto',
    marginBottom: 25
  },
  form: {
    minWidth: 100,
    paddingRight: 20
  },
  button: {
    margin: 10,
    float: 'right'
  }
});

export default function BookSearch(props) {
  const classes = useStyles();
  
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [titleHelperText, setTitleHelperText] = useState('');

  const [author, setAuthor] = useState('');
  const [authorError, setAuthorError] = useState(false);
  const [authorHelperText, setAuthorHelperText] = useState('');

  const [minLength, setMinLength] = useState('');
  const [minLengthError, setMinLengthError] = useState(false);
  const [minLengthHelperText, setMinLengthHelperText] = useState('');

  const [maxLength, setMaxLength] = useState('');
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [maxLengthHelperText, setMaxLengthHelperText] = useState('');

  const [genre, setGenre] = useState('');
  const [genreError, setGenreError] = useState(false);
  const [genreHelperText, setGenreHelperText] = useState('');

  const [audience, setAudience] = useState('');
  const [audienceError, setAudienceError] = useState(false);
  const [audienceHelperText, setAudienceHelperText] = useState('');

  // All fields are optional, but can only submit search terms if there are no errors
  let buttonDisable = titleError || authorError || minLengthError || maxLengthError || genreError || audienceError;

  const titleChange = (event) => {
    setTitle(event.target.value);
  };
  const validateTitle = (event) => {
    setTitle(event.target.value.trim());
    const [error, errorMessage] = DataValidator.title(title, true);
    setTitleError(error);
    setTitleHelperText(errorMessage);
  };

  const authorChange = (event) => {
    setAuthor(event.target.value);
  };
  const validateAuthor = (event) => {
    setAuthor(event.target.value.trim());
    const [error, errorMessage] = DataValidator.author(author, true);
    setAuthorError(error);
    setAuthorHelperText(errorMessage);
  };

  const minLengthChange = (event) => {
    setMinLength(event.target.value);
  };
  const validateMinLength = () => {
    const [error, errorMessage] = DataValidator.length(minLength, true);
    setMinLengthError(error);
    setMinLengthHelperText(errorMessage);
  };

  const maxLengthChange = (event) => {
    setMaxLength(event.target.value);
  };
  const validateMaxLength = () => {
    const [error, errorMessage] = DataValidator.length(maxLength, true);
    setMaxLengthError(error);
    setMaxLengthHelperText(errorMessage);
    if(maxLength && (maxLength <= minLength)) {
      setMaxLengthError(true);
      setMaxLengthHelperText('Maximum must be greater than minimum.');
    }
  };

  const genreChange = (event) => {
    setGenre(event.target.value);
  };
  const validateGenre = () => {
    const [error, errorMessage] = DataValidator.genre(genre, true);
    setGenreError(error);
    setGenreHelperText(errorMessage);
  };

  const audienceChange = (event) => {
    setAudience(event.target.value);
  };
  const validateAudience = () => {
    const [error, errorMessage] = DataValidator.audience(audience, true);
    setAudienceError(error);
    setAudienceHelperText(errorMessage);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const searchTerms = { title, author, minLength, maxLength, genre, audience };
    props.formAction(searchTerms);
  };

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setMinLength("");
    setMaxLength("");
    setGenre("");
    setAudience("");
    props.clearAction();
  };

  return (
    <div>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography variant='h5'>Narrow the results:</Typography> 
          <form>
            <TextField
              label="Search in Title"
              value={title}
              onChange={titleChange}
              className={classes.form}
              error={titleError}
              helperText={titleHelperText}
              onBlur={validateTitle}
            />
            <TextField
              label="Search in Author (Last, First)"
              value={author}
              onChange={authorChange}
              className={classes.form}
              error={authorError}
              helperText={authorHelperText}
              onBlur={validateAuthor}
            />
            <TextField
              label="Minimum page length"
              value={minLength}
              onChange={minLengthChange}
              className={classes.form}
              error={minLengthError}
              helperText={minLengthHelperText}
              onBlur={validateMinLength}
            />
            <TextField
              label="Maximum page length"
              value={maxLength}
              onChange={maxLengthChange}
              className={classes.form}
              error={maxLengthError}
              helperText={maxLengthHelperText}
              onBlur={validateMaxLength}
            />
            <FormControl className={classes.form} error={genreError} onBlur={validateGenre}>
              <InputLabel>Genre</InputLabel>
              <Select value={genre} onChange={genreChange}>
                <MenuItem value={'fiction'}>fiction</MenuItem>
                <MenuItem value={'nonfiction'}>nonfiction</MenuItem>
              </Select>
              <FormHelperText>{genreHelperText}</FormHelperText>
            </FormControl>
            <FormControl className={classes.form} error={audienceError} onBlur={validateAudience}>
              <InputLabel>Audience</InputLabel>
              <Select value={audience} onChange={audienceChange}>
                <MenuItem value={'adults'}>adults</MenuItem>
                <MenuItem value={'children'}>children</MenuItem>
              </Select>
              <FormHelperText>{audienceHelperText}</FormHelperText>
            </FormControl>
          </form>

          <Button onClick={formSubmit} className={classes.button} variant="contained" color="primary" disabled={buttonDisable && props.disabled}>
            Submit
          </Button>
          <Button onClick={clearForm} className={classes.button} variant="contained" color="secondary">
            Clear
          </Button>

        </CardContent>
      </Card>
    </div>
  )
};
