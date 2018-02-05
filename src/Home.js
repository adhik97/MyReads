import React,{Component} from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Home extends Component{

	render(){

		const {books,onShelfChange} = this.props

		return(

			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	            <div className="list-books-content">
	              <div>
	                <BookShelf title="Currently Reading" books={books.filter(book => book.shelf === 'currentlyReading')} onShelfChange={onShelfChange}/>
	                <BookShelf title="Want to Read" books={books.filter(book => book.shelf === 'wantToRead')} onShelfChange={onShelfChange}/>
	                <BookShelf title="Read" books={books.filter(book => book.shelf === 'read')} onShelfChange={onShelfChange}/>
	              </div>
	            </div>
	            <div className="open-search">
	              <Link to='/search'>Add a book</Link>
	            </div>
          </div>
			)
	}
}

Home.propTypes = {
	books:PropTypes.array.isRequired,
	onShelfChange:PropTypes.func.isRequired
}

export default Home