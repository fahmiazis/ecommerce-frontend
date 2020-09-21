import React from 'react'
import {default as axios} from 'axios'
import { Jumbotron, Container, Row, 
  Col, Card, CardBody, CardText,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button 
} from "reactstrap";
import Navibar from '../components/Navibar'



//import HOme from './pages/home'

class Episode extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: {},
      modalOpen: false,
      openedEpisode: '',
      navbarOpen: false
    }
  }

openModal = (openedEpisode)=>{
  this.setState({modalOpen: true, openedEpisode})
}

async componentDidMount(){
  const {data} = await axios.get('https://rickandmortyapi.com/api/episode')
  this.setState({data})
}

render(){
  const {data} = this.state
  return(
    <React.Fragment>
      <Navibar />
      <Container>
      <Jumbotron className="mt-5">
        <h1>List of Rick and Morty Episode</h1>
      </Jumbotron>
      <Row>
      {Object.keys(data).length &&  data.results.map(item=>{
        return(
            <Col sm={6} md={3}>
              <Card className="mt-3 shadow" >
                <CardBody>
                  <CardText>{item.episode}: {item.name}</CardText>
                  <Button  onClick={()=>this.openModal(`${item.episode}:${item.name}`)}>Detail</Button>
                </CardBody>
              </Card>
            </Col>
        )
      })}
      </Row>
    </Container>
    <div className="bg-dark text-light py-5 mt-3">
    <Container>
      <Row>
        <Col>&copy; Rick And Morty 2020</Col>
      </Row>
    </Container>
    </div>
    <Modal isOpen={this.state.modalOpen}>
      <ModalHeader>Detail</ModalHeader>
      <ModalBody>{this.state.openedEpisode}</ModalBody>
      <ModalFooter>
        <Button onClick={()=>this.setState({modalOpen: false})}>Close</Button>
      </ModalFooter>
    </Modal>
    </React.Fragment>    
    )
  }
}

export default Episode