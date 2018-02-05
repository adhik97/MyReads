import React,{ Component } from 'react'
import BookGrid from './BookGrid'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Search extends Component{

	render(){

		const {searchedBooks,onQueryUpdate,onShelfChange} = this.props

		return(
			<div className="search-books">
	            <div className="search-books-bar">
	              <Link className="close-search" to='/'>Close</Link>
	              <div className="search-books-input-wrapper">
	                <input type="text"  onChange={(e) => onQueryUpdate(e.target.value)} placeholder="Search by title or author"/>
	              </div>
	            </div>
	            <div className="search-books-results">
	              <BookGrid books={searchedBooks} onShelfChange={onShelfChange}/>
	            </div>
          	</div>
          	)
	}
}

Search.propTypes = {
	onQueryUpdate:PropTypes.func.isRequired,
	searchedBooks:PropTypes.array.isRequired,
	onShelfChange:PropTypes.func.isRequired
}

export default Search