import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import { Route,Switch } from 'react-router-dom'
import Search from './Search'
import Home from './Home'
import Page404 from './Page404'

class BooksApp extends React.Component {


  componentDidMount(){
    BooksAPI.getAll().then((books) => this.setState ({ books }))
  }

  state={
    books:[],
    searchedBooks:[]
  }

  shelfChange = (book,shelf) => {

    BooksAPI.update(book,shelf).then(() => {

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
    })
  }

  updateQuery = (query) => {
    query = query.trim()

    if(query === '')
      this.setState({searchedBooks:[]})
    else {
      BooksAPI.search(query).then((searchedBooks) => {

        if(!searchedBooks.error){

          this.setState(prevState => {

            searchedBooks.forEach(book => {
              let index=prevState.books.findIndex((b) => b.id === book.id)
              if(index > -1)
                book.shelf=prevState.books[index].shelf
              else
                book.shelf='none'
            })
            return {searchedBooks}
          })
        }
        else
          this.setState({searchedBooks:[]})
      })
    }
  }


  render() {

    const { books,searchedBooks } = this.state

    return (
      <div className="app">

      <Switch>
        <Route path='/search' render={() => (<Search onShelfChange={this.shelfChange} searchedBooks={searchedBooks} onQueryUpdate={this.updateQuery}/>)}/>
        <Route exact path='/' render={() => (<Home books={books} onShelfChange={this.shelfChange}/>)}/>
        <Route component={Page404}/>
      </Switch>


      </div>
      )

  }
}

export default BooksApp
