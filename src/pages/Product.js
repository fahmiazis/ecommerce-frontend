import React from 'react'
import {Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, Row, Col} from 'reactstrap'
import {default as axios} from 'axios'
import Navibar_admin from '../components/Navibar_admin'
import qs from 'querystring'
import logo from '../img/logo.png'
import '../App.css'

class Product extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: [],
      modalOpen: false,
      modalDelete: false,
      modalCreate: false,
      deleteId: 0,
      id: '',
      name: '',
      price: 0,
      next:"",
      description:'',
      category: 0,
      link: 'http://localhost:8080/product'
    }
  }
  async componentDidMount(){
    await this.getData()
  }
  getData = async()=>{
    const {data} = await axios.get(`${this.state.link}`)
    this.setState({data: data.data})
  }

  nextLink = async()=>{
    const {data} = await axios.get(`${this.state.link}`)
    this.setState({link: data.pageInfo.nextLink}, async()=>{
      await this.getData()
    })
  }

  prevLink = async(e)=>{
    const {data} = await axios.get(`${this.state.link}`)
    this.setState({link: data.pageInfo.prevLink}, async()=>{
      await this.getData()
    })
  }

  editProduct = async (id)=>{
    const {data} = await axios.get(`http://localhost:8080/product/${id}`)
    this.setState({modalOpen: true, ...data.data})
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  formSubmit = async (e)=>{
    e.preventDefault()
    await axios.patch(`http://localhost:8080/product/${this.state.id}`, qs.stringify({name: this.state.name, price: this.state.price, description: this.state.description}))
    this.setState({modalOpen: false}, async()=>{
      await this.getData()
    })
  }

  formCreate = async (e)=>{
    e.preventDefault()
    await axios.post(`http://localhost:8080/product/${this.state.id}`, qs.stringify({name: this.state.name, price: this.state.price, description: this.state.description, category: this.state.category}))
    this.setState({modalCreate: false}, async()=>{
      await this.getData()
    })
  }

  createProduct = () => {
    this.setState({modalCreate: true})
  }

  delProduct = (id) =>{
      this.setState({modalDelete: true, deleteId:id})
    // return id
  }

  deleteProduct = async (id)=>{
    // id = this.delProduct
    await axios.delete(`http://localhost:8080/product/${id}`)
    this.setState({
      modalDelete: false
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
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
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
                      <Button size="sm" outline color="secondary" onClick={()=>this.editProduct(item.id)} >Edit</Button> &nbsp;
                      <Button size="sm" color="danger" onClick={()=>this.delProduct(item.id)}>Delete</Button>
                    </td>

                  </tr>
                </React.Fragment>
              )
            })
            }
          </tbody>
        </Table>
        
        <div className="mt-2 mb-3 mr-5">
        <Button color="primary text-light" onClick={()=>this.createProduct()}>Add Product </Button>
          <div className="float-right mr-10">
            <Button color="danger" className="but badge-pill" onClick={()=>this.prevLink()}>Prev</Button>
            <Button className="but ml-3 badge-pill" outline color="secondary" onClick={()=>this.nextLink()}>Next</Button>
          </div>
        </div>  
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

        <Modal isOpen={this.state.modalDelete}>
            <ModalBody>
                <h4>Are you sure want to delete ?</h4>
            </ModalBody>
            <ModalFooter>
                <Button onClick={()=>this.deleteProduct(this.state.deleteId)}>Yes</Button>
                <Button onClick={()=>this.setState({modalDelete: false})}>No</Button>
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