import React from 'react'
import {Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, Row, Col} from 'reactstrap'
import {default as axios} from 'axios'
import Navibar_admin from '../components/Navibar_admin'
import qs from 'querystring'
import logo from '../img/logo.png'

class Product extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: [],
      modalOpen: false,
      modalCreate: false,
      id: '',
      name: '',
      price: 0,
      description:'',
      category: 0,
    }
  }
  async componentDidMount(){
    await this.getData()
  }
  getData = async()=>{
    const {data} = await axios.get('http://localhost:8080/product')
    this.setState({data: data.data})
  }
  
  editProduct = async (id)=>{
    const {data} = await axios.get(`http://localhost:8080/product/${id}`)
    this.setState({modalOpen: true, ...data.data}, ()=>{
      console.log('ok')
    })
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  formSubmit = async (e)=>{
    e.preventDefault()
    await axios.patch(`http://localhost:8080/category/${this.state.id}`, qs.stringify({name: this.state.name, price: this.state.price, description: this.state.description}))
    this.setState({modalOpen: false}, async()=>{
      await this.getData()
    })
  }

  formCreate = async (e)=>{
    e.preventDefault()
    await axios.post(`http://localhost:8080/category/${this.state.id}`, qs.stringify({name: this.state.name, price: this.state.price, description: this.state.description, category: this.state.category}))
    this.setState({modalCreate: false}, async()=>{
      await this.getData()
    })
  }

  createProduct = async (id)=>{
    this.setState({modalCreate: true})
  }


  deleteProduct = async (id)=>{
    await axios.delete(`http://localhost:8080/category/${id}`)
    this.setState({
      modalOpen: false
    }, ()=>{
      this.getData()
    })
  }

  render(){
    return(
      <>
      <Navibar_admin />
      <Container className='ml-auto'>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(item=>{
              return(
                <React.Fragment>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>
                      <Button size="sm" color="primary" onClick={()=>this.editProduct(item.id)}>Edit</Button> &nbsp;
                      <Button size="sm" color="danger" onClick={()=>this.deleteProduct(item.id)}>Delete</Button>
                    </td>

                  </tr>
                </React.Fragment>
              )
            })
            }
          </tbody>
        </Table>
        <Button color="warning text-light" onClick={()=>this.createProduct()}>Add Product </Button>  
        </Container>  

        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>
          <img src={logo} alt="logo"/>
          </ModalHeader>
          <ModalBody>
            <Form>
              <Input name='name' className="mt-3" onChange={this.changeInput} value={this.state.name} />
              <Input name='price' className="mt-3" onChange={this.changeInput} value={this.state.price} />
              <Input name='description' className="mt-3 mb-3" onChange={this.changeInput} value={this.state.description} />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Form onSubmit={this.formSubmit}>
            <Button>Submit</Button>
            </Form>
            <Button onClick={()=>this.setState({modalOpen: false})}>Close</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalCreate}>
          <ModalHeader>
          <img src={logo} alt="logo"/>
          </ModalHeader>
          <ModalBody>
            <Form className="row">
              <Container sm={3} md={6}>
              <Row>
                  <Col sm={3} md={3}>
                    <div className="mt-4">Name</div>
                    <div className="mt-4">Price</div>
                    <div className="mt-4">Description</div>
                    <div className="mt-4">Category</div> 
                    
                  </Col>
                  <Col sm={3} md={9}>
                    <Input name='name' className="mt-3" onChange={this.changeInput} />
                    <Input name='price' className="mt-3" onChange={this.changeInput} />
                    <Input name='description' className="mt-3" onChange={this.changeInput} />
                    <Input name='category' className="mt-3 mb-3" onChange={this.changeInput} />
                  </Col>
              </Row>
              </Container>
            </Form>
          </ModalBody>
          <ModalFooter>
          <Form onSubmit={this.formCreate}>
                <Button>Upload</Button>
            </Form>
            <Button onClick={()=>this.setState({modalCreate: false})}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default Product