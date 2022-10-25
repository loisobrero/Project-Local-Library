const { getTotalAccountsCount } = require("./home");

// use find method
// function used to find an account with a certain ID
// takes in two parameters: accounts array, an account ID
// returns an account object that matches the ID
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

// use sort method
// sort an array of accounts alphabetically by last name
// parameter(s): accounts array
// returns the sorted array either negative or positive value
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1 : -1));
}

// function used to get total number of times a user has borrowed books
// parameters: account object, books array
// create a total variable that returns number of books borrowed
function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  const borrowedBookArray = books.map((book) => book.borrows);
  borrowedBookArray.forEach((array) => 
    array.forEach((borrowedBook) => {
      return borrowedBook.id === account.id ? total ++ : total;
    })
  );
  return total;
}

const newBookArray = [];

// helper function and find()
function createNewBookArray(account, books) {
  books.forEach((book) => {
    if (
      book.borrows.find(
        (book) => book.id === account.id && book.returned === false
      )
    ) {
      newBookArray.push(book);
    }
  });
  return newBookArray;
}


// a function to find out which books are currently checked out by given account
// parameters: account, books array, authors array
// return an object that has a book with author included in between authorId and borrows
function getBooksPossessedByAccount(account, books, authors) {
  createNewBookArray(account, books);
  newBookArray.forEach((book) => {
    const newAuthorID = authors.find((author) => author.id === book.authorId);
    return (book["author"] = newAuthorID);
  });
  return newBookArray;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
