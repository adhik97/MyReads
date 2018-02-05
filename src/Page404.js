import React,{Component} from 'react'
import {Link} from 'react-router-dom'

class Page404 extends Component{

	render(){

		return <div style={{color:'grey',
						    textAlign:'center'}}>
						   <br/>
						   <br/>
						   <h1>Oops</h1><br/>
						   <h3>Page not found</h3>
						   <p>Click <Link to="/">here</Link> to go back to Home Page</p>
				</div>
	}

}

export default Page404