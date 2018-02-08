import React,{ Component } from 'react'
import BookGrid from './BookGrid'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
class Search extends Component{

	state={
		searchedBooks:[]
	}

	updateQuery = (query,books) => {
    query = query.trim()

    if(query === '')
      this.setState({searchedBooks:[]})
    else {
      BooksAPI.search(query).then((searchedBooks) => {

        if(!searchedBooks.error){

          this.setState(prevState => {

            searchedBooks.forEach(book => {
              let index=books.findIndex((b) => b.id === book.id)
              if(index > -1)
                book.shelf=books[index].shelf
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

  searchedShelfChange = (book,shelf) =>{

  		if(this.props.onShelfChange(book,shelf)){
  			this.setState(prevState => {
  				prevState.searchedBooks[prevState.searchedBooks.findIndex(b=>b.id === book.id)].shelf=shelf
  				return {searchedBooks:prevState.searchedBooks}
  			})
  		}

  }

	render(){

		const {books} = this.props
		const {searchedBooks} = this.state

		return(
			<div className="search-books">
	            <div className="search-books-bar">
	              <Link className="close-search" to='/'>Close</Link>
	              <div className="search-books-input-wrapper">
	                <input type="text"  onChange={(e) => this.updateQuery(e.target.value,books)} placeholder="Search by title or author"/>
	              </div>
	            </div>
	            <div className="search-books-results">
	              <BookGrid books={searchedBooks} onShelfChange={this.searchedShelfChange}/>
	            </div>
          	</div>
          	)
	}
}

Search.propTypes = {

	books:PropTypes.array.isRequired,
	onShelfChange:PropTypes.func.isRequired
}

export default Search