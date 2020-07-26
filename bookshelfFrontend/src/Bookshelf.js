// Page for displaying, searching, and editing books
import React, { useState, useEffect } from 'react';
import { 
  Typography,
  makeStyles, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import DataAccess from './DataAccess';
import BookSearch from './BookSearch';
import BookDisplay from './BookDisplay';
import BookEditor from './BookEditor';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
    padding: '5px'
  },
  alert: {
    width: '90%',
    margin: 'auto',
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default function Bookshelf() {
  const classes = useStyles();

  const [books, setBooks] = useState([]);
  
  const [searchStatus, setSearchStatus] = useState(true);
  
  const [editStatus, setEditStatus] = useState(false);
  const [bookToEdit, setBookToEdit] = useState([]);

  const [warningStatus, setWarningStatus] = useState(false);
  const [bookToDelete, setBookToDelete] = useState();

  const [alertStatus, setAlertStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertSeverity, setAlertSeverity] = useState();

  const loadBooks = () => {
    DataAccess.get()
      .then(response => {
        const newBooks = [];
        response.data.results.forEach(book => {
          newBooks.push(book);
        });
        setBooks(newBooks);
    })
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const setAlert = (message, severity)=> {
    setAlertStatus(true);
    setAlertMessage(message);
    setAlertSeverity(severity);
    setTimeout(() => setAlertStatus(false), 2000);
  };

  // Only want to display either edit component or search component, not both
  // so setStatus for each to toggle which is displayed
  const startEdit = (book) => {
    setEditStatus(true);
    setSearchStatus(false);
    setBookToEdit(book);
  };
  // User can either cancel an edit or submit an edit
  const cancelEdit = () =>{
    setEditStatus(false);
    setSearchStatus(true);
  };
  const submitEdit = (book) => {
    setEditStatus(false);
    setSearchStatus(true);
    // Edit in database
    DataAccess.edit(book)
      .then(response => {
        if(response.data.success) {
          setAlert('Book was successfully edited!', 'success');
          loadBooks();
        }
        else {
          setAlert('There was an error in updating the book', 'error');
        }
      })
      .catch(error => {
        setAlert('There was an error in updating the book', 'error');
    });

  };

  const openDeleteDialog = (book) => {
    setWarningStatus(true);
    setBookToDelete(book);
  };
  // User can either cancel delete or approve delete
  const cancelDelete = () => {
    setWarningStatus(false);
  };
  const deleteBook = () => {
    setWarningStatus(false);
    // Delete in database
    DataAccess.delete(bookToDelete.id)
      .then(response => {
        if(response.data.success) {
          setAlert('Book was successfully deleted!', 'success');
          loadBooks();
        }
        else {
          setAlert('There was an error in deleting the book', 'error');
        }
      })
      .catch(error => {
        setAlert('There was an error in deleting the book', 'error');
    });
  };

  const searchBooks = (searchTerms) => {
    DataAccess.search(searchTerms)
      .then(response => {
        const newBooks = [];
        response.data.results.forEach(book => {
          newBooks.push(book);
        });
        setBooks(newBooks);
      })
      .catch(error => {
        setAlert('There was an error while searching the book', 'error');
      });
  };

  return (
    <div>
      <Typography variant='h2' className={classes.title}>Bookshelf</Typography>

      { alertStatus &&
        <Alert severity={alertSeverity} className={classes.alert}>{alertMessage}</Alert>
      }

      { searchStatus &&
        <BookSearch formAction={searchBooks} clearAction={loadBooks}/>
      }

      { editStatus &&
        <BookEditor
        cardTitle="Make changes, then click save"
        book={bookToEdit}
        isEdit={true}
        cancelAction={cancelEdit}
        cancelLabel="Cancel"
        formAction={submitEdit}
        submitLabel="Save"
        />
      }

      <BookDisplay
        books={books}
        editButtonAction={startEdit}
        deleteButtonAction={openDeleteDialog}
        editStatus={editStatus}
      />
      
      <Dialog open={warningStatus} onClose={cancelDelete}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this book?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>
            No
          </Button>
          <Button onClick={deleteBook} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};
