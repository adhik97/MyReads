import React,{ Component } from 'react'
import PropTypes from 'prop-types';

class BookGrid extends Component {

 render(){

 	const { books,onShelfChange }=this.props

 	return (
 		<ol className="books-grid">

 				{books.map((book) => {


 						if(book.imageLinks === undefined){
 							book.imageLinks={}
 							book.imageLinks.thumbnail = 'http://via.placeholder.com/128x193?text=No%20Cover'
 						}

						return <li key={book.id}>
		                        <div className="book">
		                          <div className="book-top">
		                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+book.imageLinks.thumbnail+'")' }}></div>
		                            <div className="book-shelf-changer">
		                              <select value={book.shelf} onChange={(e) => onShelfChange(book,e.target.value)}>
		                                <option value="none" disabled>Move to...</option>
		                                <option value="currentlyReading">Currently Reading</option>
		                                <option value="wantToRead">Want to Read</option>
		                                <option value="read">Read</option>
		                                <option value="none">None</option>
		                              </select>
		                            </div>
		                          </div>
		                          <div className="book-title">{book.title}</div>
		                          <div className="book-authors">{book.authors !== undefined ? book.authors.join(', ') : ''}</div>
		                        </div>
		                      </li>

 				})}

        </ol>
    	)
	}

}

BookGrid.propTypes = {

	books:PropTypes.array.isRequired,
	onShelfChange:PropTypes.func.isRequired
}

export default BookGrid