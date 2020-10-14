import React, { Component } from 'react'
import {Container, Row, Col, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
Form, Input, Label} from 'reactstrap'
import Navibar from '../components/Navibar'
import profile from '../assets/img/profile1.png'
import pen from '../assets/img/pen.svg'
import adr from '../assets/img/adr.svg'
import user from '../assets/img/user.svg'
import bag from '../assets/img/bag.svg'

import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import profileAction from '../redux/actions/profile'
import addressAction from '../redux/actions/address'

const {REACT_APP_URL} = process.env

class ProfileAddress extends Component {
    state={
        addr_name: '',
        recipient: '',
        address: '',
        city: '',
        telephone: '',
        postal_code: '',
        status: '',
        modal: false
    }

    componentWillMount(){
        this.props.getProfile(this.props.auth.token)
    }

    componentDidMount(){
        this.props.getAddress(this.props.auth.token)
    }

    // componentDidUpdate(){
    //     if (this.props.profile.alertMsg !== '') {
    //         this.props.clearMessage()
    //         const {address} = this.props.address
    //         this.setState({
    //             addr_name: address.addr_name,
    //             recipient: address.recipient,
    //             address: address.address,
    //             city: address.city,
    //             telephone: address.telephone,
    //             postal_code: address.postal_code,
    //             status: address.status
    //         })
    //     }
    // }

    addAddress = async (e) =>{
        e.preventDefault()
        const {addr_name, recipient, address, city, telephone, postal_code, status} = this.state
        const data = {
            addr_name, 
            recipient, 
            address, 
            city, 
            telephone, 
            postal_code, 
            status
        }
        this.props.addAddress(this.props.auth.token, data)
        this.setState({modal: false}, async()=>{
            await this.props.getAddress(this.props.auth.token)
          })
    }

    onChangeStatus =(e) => {
        this.setState({[e.target.name]:e.target.id})
    }

    onChangeText =(e) => {
        this.setState({[e.target.name]:e.target.value})
        console.log(this.state)
    }

    render() {
        const {data} = this.props.profile
        const {address} = this.props.address
        return (
            <div>
            <>
            <Navibar />
            <Container fluid className="full">
                <Row>
                   <Col md={3}>
                   {Object.keys(data).length&&( 
                        <div className="side d-flex">
                         
                            <img className="img-side rounded-circle" src={data.picture===null?profile:REACT_APP_URL.concat(data.picture)}/>
                            <div className="ml-3">
                                <div className="font-weight-bold mt-2 name">{data.name}</div> 
                                <div><img src={pen} className="mr-1"/>Ubah profile</div>
                            </div>  
                        </div>
                        )}
                        <div>
                            <Link to="/profile">
                            <div className="text-secondary mb-4">
                                <Button color="primary" className="btnside badge-pill mr-3"><img src={user}/></Button>
                                My Account
                            </div>
                            </Link>
                            <div className="font-weight-bold mb-4">
                                <Button color="warning" className="btnside badge-pill mr-3"><img src={adr}/></Button>
                                Shipping Address
                            </div>
                            <div className="text-secondary mb-4">
                                <Button color="danger" className="btnside badge-pill mr-3"><img src={bag}/></Button>
                                My Order
                            </div>
                        </div>
                   </Col>
                   <Col md={9} className="forminput vh-100">
                   
                        <div className="input-center">
                            
                            <h3>Choose another address</h3>
                            <h6 className="text-secondary">Manage your shipping address</h6>
                            <hr />
                            
                            <div onClick={()=>this.setState({modal:true})} className="mb-5 d-flex justify-content-center text-secondary addnew">
                                Add New Address
                            </div>
                            {address.map(item => {
                            return(
                            <div className="addmain mb-4">
                                <div className="mb-3 h6 name">{item.recipient}</div>
                                <article className="name mb-3">{item.address}, {item.city}, {item.postal_code}, 
                                Telephone: {item.telephone}</article>

                                {/* <article className="mb-3">Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181</article> */}
                                <a href="" className="text-danger">Change Address</a>
                            </div>
                               )
                            })}
                       </div>
                   </Col> 
                </Row>
            </Container>
            <Modal isOpen={this.state.modal} className="">
                <ModalHeader><div className="ml-5">Add new address</div></ModalHeader>
                <ModalBody className="">
                    <Form>
                        <div className="text-secondary">Save address as (ex : home address, office address)</div>
                        <Input onChange={this.onChangeText} placeholder="Rumah" name="addr_name" className="mb-2 text-area"/>
                        <Row>
                            <Col sm={12} md={6}>
                                <div className="mb-2 text-secondary">Recipient Name</div>
                                <Input onChange={this.onChangeText} className="mb-3" name="recipient"/>
                                <div className="mb-2 text-secondary">Address</div>
                                <Input onChange={this.onChangeText} className="mb-3" name="address"/>
                                <div className="mb-2 text-secondary">City or Subdistrict</div>
                                <Input onChange={this.onChangeText} className="mb-3" name="city"/>
                                <Label className="ml-4 text-secondary">
                                    <Input onChange={this.onChangeStatus} type="checkbox" name="status" id="primary" /> Make it the Primary address
                                </Label>
                            </Col>
                            <Col sm={12} md={6}>
                            <div className="mb-2 text-secondary">Recipient Telephone Number</div>
                            <Input onChange={this.onChangeText} className="mb-3" name="telephone" />
                            <div className="mb-2 text-secondary">Postal Code</div>
                            <Input onChange={this.onChangeText} className="mb-3" name="postal_code" />
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Form onSubmit={this.addAddress}>
                    <Button className="rounded-pill btn-danger">Save</Button>
                </Form>
                <Button className="rounded-pill" outline onClick={()=>this.setState({modal: false})}>Close</Button>
                </ModalFooter>
            </Modal>
            </>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    address: state.address
})

const mapDispatchToProps = {
    getProfile: profileAction.getProfile,
    getAddress: addressAction.getAddress,
    clearMessage: addressAction.clearMessage,
    addAddress: addressAction.addAddress
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAddress)