import React from 'react'
import { Container, Navbar, 
  NavbarBrand, NavbarToggler, Nav, 
  Collapse, NavItem, NavLink
} from 'reactstrap';
import logo from '../img/logo.png'

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
                    <NavLink href="#">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Episode</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Admin</NavLink>
                </NavItem>
                </Nav>
                </Collapse>
                </Container>
            </Navbar>

        )
    }
}

export default Navibar