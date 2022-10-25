const { getBooksPossessedByAccount } = require("./accounts");



// function to count books that takes in an array of book objects
// returns number of objects in parameter array
function getTotalBooksCount(books) {
  return books.length;
}

// function to accounts that takes in an array of account objects
// returns number of account objects
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

// a function to count books currently borrowed
// take in an array of book objects as a parameter
// returns number of books currently borrowed
function getBooksBorrowedCount(books) {
  total = 0;
  const borrowedBook = books.map((book) => book.borrows);
  borrowedBook.forEach((array) =>
    array.forEach((borrowObj) =>
      borrowObj.returned === false ? total++ : total
    )
  );
  return total;
}

const countObj = {};

// helper function

function createCountObj(books) {
  books.forEach((book) => {
    if (countObj[book.genre] != null) {
      countObj[book.genre]++;
    } else {
      countObj[book.genre] = 1;
    }
    });
  return countObj;
}

//for/in loop
function getMostCommonGenres(books) {
  const countList = [];
  let newObject = {};
  createCountObj(books);
  for (let item in countObj) {
    const genre = item;
    const counter = countObj[item];
    newObject = {
      name: genre,
      count: counter,
    };
    countList.push(newObject);
  }
  countList.sort((a, b) => b.count - a.count);
  countList.length = 5;
  return countList;
}



//use reduce() and sort ()
function getMostPopularBooks(books) {
  const borrows = books.reduce((acc, cur) => {
    let obj = {
      name: cur.title,
      count: cur.borrows.length,
    };
    acc.push(obj);
    return acc;
  }, []);
  borrows.sort((a,b) => (a.count < b.count ? 1 : -1));
  borrows.length = 5;
  return borrows;
}


function getMostPopularAuthors(books, authors) {
  const authorList = [];
  authors.forEach((author) => {
    const byThisAuthor = books.filter((book) => book.authorId === author.id);
    let totalBorrows = 0;
    byThisAuthor.forEach((book) => (totalBorrows += book.borrows.length));
    authorList.push({
      name: author.name.first + " " + author.name.last,
      count: totalBorrows,
    });
  });
  authorList.sort((a, b) => (a.count < b.count ? 1 : -1));
  authorList.length = 5;
  return authorList;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
