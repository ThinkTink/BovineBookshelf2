// Defines methods for accessing the backend API
import axios from 'axios';

const http = axios.create({
  baseURL: '', // configure as needed
  headers:{
    'Content-type': 'application/json'
  }
});

export default {    
  get() {
    return http.get('/books');
  },
  search(searchTerms) {
    return http.post('/books/search', searchTerms);
  },
  add(book) {
    return http.post('/books', book);
  },
  edit(book) {
    return http.put('/books', book);
  },
  delete(bookId) {
    return http.delete(`/books/${bookId}`);
  }
};
