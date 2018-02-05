import React,{ Component } from 'react'
import BookGrid from './BookGrid'
import PropTypes from 'prop-types'

class BookShelf extends Component{

	render(){
		const {title,books,onShelfChange} = this.props

		return(

			<div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                  <BookGrid books={books} onShelfChange={onShelfChange}/>
                  </div>
            </div>

			)
	}

}

BookShelf.propTypes = {
	title:PropTypes.string.isRequired,
	books:PropTypes.array.isRequired,
	onShelfChange:PropTypes.func.isRequired
}

export default BookShelf