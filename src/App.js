import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import { Route,Link } from 'react-router-dom'
import BookGrid from './BookGrid'

class BooksApp extends React.Component {


  componentDidMount(){
    BooksAPI.getAll().then((books) => this.setState ({ books }))
  }

  state={
    books:[],
    searchedBooks:[]
  }

  shelfChange = (book,shelf) => {

    this.setState( prevState => {

      if(shelf === 'none')
        return { books: prevState.books.filter(b => b.id !== book.id)}

      let index=prevState.books.findIndex((b) => b.id === book.id)
      if(index > -1)
        prevState.books[index].shelf = shelf;
      else{
        book.shelf = shelf
        prevState.books.push(book)
      }

      return { books: prevState.books }
    })

    BooksAPI.update(book,shelf)

  }

  updateQuery = (query) => {
    query = query.trim()
    console.log(query === '')
    if(query === '')
      this.setState({searchedBooks:[]})
    else {
      BooksAPI.search(query).then((searchedBooks) => {

        this.setState(prevState => {

          searchedBooks.forEach(book => {
            let index=prevState.books.findIndex((b) => b.id === book.id)
            if(index > -1)
              book.shelf=prevState.books[index].shelf
          })
          return {searchedBooks}
        })
      })
    }
  }


  render() {

    const { books,searchedBooks } = this.state

    return (
      <div className="app">
      <Route path='/search' render={() => ( <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text"  onChange={(e) => this.updateQuery(e.target.value)} placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <BookGrid books={searchedBooks} onShelfChange={this.shelfChange}/>
            </div>
          </div>)}
      />


        <Route exact path='/' render={() => (<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                  <BookGrid books={books.filter(book => book.shelf === 'currentlyReading')} onShelfChange={this.shelfChange}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                  <BookGrid books={books.filter(book => book.shelf === 'wantToRead')} onShelfChange={this.shelfChange}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <BookGrid books={books.filter(book => book.shelf === 'read')} onShelfChange={this.shelfChange}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>)}
        />


      </div>
      )

  }
}

export default BooksApp
