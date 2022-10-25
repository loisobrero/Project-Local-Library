

// function to look up author given their id number
// parameters: array of author objects, an Id number
// return the author object that matches that id
function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

// function to look up a book given its id number
// parameters: array of book objects, an Id number
// return the book object that matches that id
function findBookById(books, id) {
  return books.find(book => book.id === id);
}

//helper
const borrowedBooks = [];
const returnedBooks = [];

function helper(books) {
  let borrowedArr = [];
  borrowedArr = books.map(book => {
    return book.borrows;
  })
  return borrowedArr
}

function createBooksArr(books) {
  books.forEach((book) => {
    const bookReturned = book.borrows[0].returned;
    if (bookReturned === true) {
      returnedBooks.push(book);
    } else {
      borrowedBooks.push(book)
    }
    return bookReturned;
  });
}
// a function to to determine borrowed book status
// parameter: array of of book objects
// return an array that contains two arrays, one for borrowed, one for unborrowed
function partitionBooksByBorrowedStatus(books) {
  createBooksArr(books);
  const allBooksArr = [borrowedBooks, returnedBooks];
  return allBooksArr;
}

// function to determine who has borrowed a book
// parameters: a book object, an array of accounts
// returns an array of the most recent borrower account objects
// find
function getBorrowersForBook(book, accounts) {
  const bookBorrows = book.borrows;
  const borrowers = [];
  bookBorrows.forEach((book) => {
    const bookObj = accounts.find((account) => account.id === book.id);
    bookObj["returned"] = book.returned;
    borrowers.push(bookObj);
  });
  borrowers.length = 10;
  return borrowers;
}
 

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
