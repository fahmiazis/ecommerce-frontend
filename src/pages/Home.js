import React from 'react'
import {default as axios} from 'axios'
import Navibar from '../components/NavibarHome'
import Slider from '../components/Carousel'
import SliderCat from '../components/Carcat'
import {Container, Row, Col,
Card, CardBody, CardTitle,
CardSubtitle, CardImg, Spinner} 
from 'reactstrap'
import pol from "../assets/img/pol.png"
import star from '../assets/img/star.png'

import {connect} from 'react-redux'
import home from '../redux/actions/home'

class Home extends React.Component{
    componentDidMount(){
        this.props.getHome()
    }

    render(){
        const {isLoading, data, isError, alertMsg} = this.props.home
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
                    {!isLoading && !isError && data.length!==0 && data.map(item => {
                        return(
                        <Col sm={4} md={3}>
                            <Card className="mt-3 mr-3 shadow">
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
                    {/* <Row> */}
                        {/* {this.state.data1.map(item => { */}
                        {/* return(
                        <Col sm={4} md={3}>
                            <Card className="mt-3 mr-3 shadow">
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
                        })} */}
                    {/* </Row> */}
                </Container>
            {isLoading && !isError && (
                <div className="d-flex justify-content-center align-items-center">
                    <Spinner color="danger"/>             
                </div>
            )}
            {isError && alertMsg!=='' && (
                <div className="d-flex justify-content-center align-items-center h3 text-danger">{alertMsg}</div>
            )}
            </>
        )
    }

}

const mapStateToProps = state => ({
    home: state.home
  })
  
  const mapDispatchToProps = {
    getHome: home.getProduct
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)