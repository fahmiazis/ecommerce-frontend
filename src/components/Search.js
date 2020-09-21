import React from 'react'
import {Input, Row, Col} from 'reactstrap'
import search from '../img/Search.png'
import '../App.css'
import {default as axios} from 'axios'


class Search extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = { 
           data : [],
           search : ''  
        }
      }
   
      search(name){
        this.setState({search: name})
    }
    
    async onInputChange() {
       const {data} = await axios.get(`http://localhost:8080/product?search=${search}`)
       this.setState({data: data.data})
      }

    render(){
        return(
            <>
            <Row>
            <Col md={12}>
                <div className="input">
                    <Input className="ser rounded-pill position-relative" placeholder="Search" onKeyPress={this.search}/>
                </div>
            </Col>
            </Row>
            
            <div>
            {this.state.data.id}
            {this.state.data.name}
            {this.state.data.price}
            {this.state.data.description}
            </div>
            </>
        )
    }
}            

export default Search