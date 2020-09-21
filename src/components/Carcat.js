import React from 'react'
import {Container, Row, Col, Card} from 'reactstrap'
import {default as axios} from 'axios'
import tengah1 from '../img/tengah1.png'
import tengah2 from '../img/tengah2.png'
import tengah3 from '../img/tengah3.png'
import tengah4 from '../img/tengah4.png'
import tengah5 from '../img/tengah5.png'

class SliderCat extends React.Component{

constructor(props){
    super(props)
    this.state ={
        data: []
    }
}
    async componentDidMount(){
        await this.getData()
    }

    getData = async()=>{
        const {data} = await axios.get(`http://localhost:8080/category`)
        this.setState({data: data.data})
    }

    render(){
        return(
            <>
                <Container>
                    <Row className="justify-content-center">
                        <div className="mr-2 ml-2">
                            <img src={tengah1} />
                        </div>
                        <div className="mr-2 ml-2">
                            <img src={tengah2} />
                            </div>
                        <div className="mr-2 ml-2">
                            <img src={tengah3} />
                        </div>
                        <div className="mr-2 ml-2">
                            <img src={tengah4} />
                        </div>
                        <div className="mr-2 ml-2">
                             <img src={tengah5} />
                        </div>
                    </Row>    
                </Container>
            </>
        )
    }
}



 export default SliderCat