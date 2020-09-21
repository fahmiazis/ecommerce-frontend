import React from 'react'
import {default as axios} from 'axios'
import Navibar from '../components/NavibarHome'
import Slider from '../components/Carousel'
import SliderCat from '../components/Carcat'
import {Container, Row, Col,
Card, CardBody, CardTitle,
CardSubtitle, CardImg, CardText} 
from 'reactstrap'
import pol from "../img/pol.png"
import star from '../img/star.png'

class Home extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            data: [],
            data1: []
        }
    }

    async componentDidMount(){
        await this.getData()
    }
    
    getData = async()=>{
        const {data} = await axios.get(`http://localhost:8080/product`)
        this.setState({data: data.data}, async()=>{
          await this.getData1()
        })
    }

    getData1 = async()=>{
        const {data} = await axios.get(`http://localhost:8080/product?page=2`)
        this.setState({data1: data.data})
    }

    render(){
        return(
            <>
                <Navibar />
                <div className="mt-5">
                    <Slider />
                </div>
                <Container>
                <div className="mt-5 mb-5">    
                    <div className="display-3">Category</div>
                    <div className="text-secondary mt-3">What are you currently looking for</div>
                </div>

                <div className="mt-3">
                    <SliderCat />
                </div>

                <div className="mt-5 mb-5">
                    <div className="display-3">New</div>
                    <div className="text-secondary">You've never seen it before</div>
                </div>
                    <Row>
                        {this.state.data.map(item => {
                        return(
                        <Col sm={4} md={3}>
                            <Card className="mt-3 mr-3">
                                <CardImg className="img-fluid" width="100%" src={pol} alt="pol"/>
                               <CardBody>
                                    <CardTitle>                                       
                                        {item.name}
                                    </CardTitle>
                                    <div>
                                    <CardSubtitle className="text-danger mt-1">
                                        Rp.{item.price}
                                    </CardSubtitle>
                                    <div className="text-secondary mt-1">
                                        Blanja cloth
                                    </div>
                                    <div className="mt-1">
                                        <span><img src={star} alt="star"/></span>
                                        <span className="ml-1"><img src={star} alt="star"/></span>
                                        <span className="ml-1"><img src={star} alt="star"/></span>
                                        <span className="ml-1"><img src={star} alt="star"/></span>
                                        <span className="ml-1"><img src={star} alt="star"/></span>
                                        <span className="text-secondary ml-1">(10)</span>
                                    </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        )
                        })}
                    </Row>
                    <div className="mt-5 mb-5">
                        <div className="display-3">Popular</div>
                        <div className="text-secondary mt-2">Find clothes that are trending recently</div>
                    </div>
                    <Row>
                        {this.state.data1.map(item => {
                        return(
                        <Col sm={4} md={3}>
                            <Card className="mt-3 mr-3">
                                <CardImg className="img-fluid" width="100%" src={pol} alt="pol"/>
                               <CardBody>
                                    <CardTitle>                                       
                                        {item.name}
                                    </CardTitle>
                                    <div>
                                    <CardSubtitle className="text-danger mt-1">
                                        Rp.{item.price}
                                    </CardSubtitle>
                                    <div className="text-secondary mt-1">
                                        Blanja cloth
                                    </div>
                                    <div className="mt-1">
                                        <span><img src={star} alt="star"/></span>
                                        <span className="ml-1"><img src={star} alt="star"/></span>
                                        <span className="ml-1"><img src={star} alt="star"/></span>
                                        <span className="ml-1"><img src={star} alt="star"/></span>
                                        <span className="ml-1"><img src={star} alt="star"/></span>
                                        <span className="text-secondary ml-1">(10)</span>
                                    </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        )
                        })}
                    </Row>
                </Container>
            </>
        )
    }

}

export default Home