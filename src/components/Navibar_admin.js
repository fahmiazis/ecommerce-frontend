import React from 'react'
import { Container, Navbar, 
  NavbarBrand, NavbarToggler, Nav, 
  Collapse, NavItem, NavLink
} from 'reactstrap';
import logo from '../img/logo.png'
import Search from '../components/Search'

class Navibar_admin extends React.Component{
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
                <span className="text-danger mt-2 h2 align-item-center">Admin</span>
                <NavbarToggler onClick={()=>this.setState({navbarOpen: !this.state.navbarOpen})}/>
                <Collapse navbar isOpen={this.state.navbarOpen}>
                <Nav navbar className="ml-auto">
                <Search />
                <NavItem>
                    <NavLink href="#" className="text-danger">Product</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="text-danger">Cart</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="text-danger">Category</NavLink>
                </NavItem>
                </Nav>
                </Collapse>
                </Container>
            </Navbar>

        )
    }
}

export default Navibar_admin