import React from 'react'
import { Container, Navbar, Row, Col,
  NavbarBrand, NavbarToggler, Nav, 
  Collapse, NavItem, NavLink, Button
} from 'reactstrap';
import logo from '../img/logo.png'
import '../App.css'
import Search from './Search'

class Navibar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          navbarOpen: false
        }
      }

    render(){
        return(
            <Navbar color="light" light expand="md shadow">
            <Container>
                <NavbarBrand><img src={logo} alt='logo'/></NavbarBrand>
                <NavbarToggler onClick={()=>this.setState({navbarOpen: !this.state.navbarOpen})}/>
                <Collapse navbar isOpen={this.state.navbarOpen}>
                <Nav navbar className="ml-auto">
                <NavItem>
                    <Search />
                </NavItem>
                <NavItem>
                    <NavLink href="#"><Button color="danger" className="but badge-pill">Login</Button></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#"><Button className="but badge-pill" outline color="secondary">Sign Up</Button></NavLink>
                </NavItem>
                </Nav>
                </Collapse>
                </Container>
            </Navbar>

        )
    }
}

export default Navibar