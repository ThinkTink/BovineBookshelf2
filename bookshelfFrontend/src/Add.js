// Page for adding a new book to the collection
import React, { useState } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import BookEditor from './BookEditor';
import DataAccess from './DataAccess';

const useStyles = makeStyles({
  pageTitle: {
    textAlign: 'center',
    padding: '5px'
  },
  alert: {
    width: '90.5%',
    margin: 'auto',
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default function Add() {
  const classes = useStyles();
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertSeverity, setAlertSeverity] = useState();

  const setAlert = (message, severity)=> {
    setAlertStatus(true);
    setAlertMessage(message);
    setAlertSeverity(severity);
    setTimeout(() => setAlertStatus(false), 2000);
  }

  const addBook = (book) => {
    DataAccess.add(book)
      .then(response => {
        if(response.data.success) {
          setAlert('Book was successfully added!', 'success');
        }
        else {
          setAlert('There was an error in adding the book.', 'error');
        }
      })
      .catch(error => {
        setAlert('There was an error in adding the book.', 'error');
    });
  }

  return (
    <div>
      <Typography variant='h2' className={classes.pageTitle}>Add a Book</Typography>

      { alertStatus &&
        <Alert severity={alertSeverity} className={classes.alert}>{alertMessage}</Alert>
      }
      
      <BookEditor
        cardTitle="Know a book that belongs on the Bovine Bookshelf? Enter its details and click Submit to add it:"
        isEdit={false}
        cancelLabel="Clear"
        submitLabel="Submit"
        formAction={addBook}
      />
    </div>
  )
};
