import React from 'react'
import {Link} from 'react-router-dom'
import {Alert, Button, ButtonGroup, Container, Form, Input} from 'reactstrap'
import {connect} from 'react-redux'
import auth from '../redux/actions/auth'
import logo from '../assets/img/logo.png'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
    }
    login = (e) => {
        e.preventDefault()
        const {email, password} = this.state
        const data = {
            email,
            password
        }
        this.props.login(data)
        this.props.history.push('/cart')
    }
    onChangeText =(e) => {
        console.log({[e.target.name]:e.target.value})
        this.setState({[e.target.name]:e.target.value})
    }

    render() {
        const {isError, alertMsg} = this.props.auth
        return (
            <>
                <Container className="vh-100 vw-100 d-flex justify-content-center align-items-center">
                    <div>
                    <div class="header text-center">
                        <img src={logo} className="mb-5" alt="logo" />
                        <div className="font-weight-bold mb-5">
                            <span>Please Login with your account</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <ButtonGroup className="mb-5" color="none">
                            <Button outline color="secondary" className="btn">Customer</Button>
                            <Button outline color="secondary" className="btn">Seller</Button>
                        </ButtonGroup>
                    </div>
                        <Alert color={isError?'danger':'success'} isOpen={isError || alertMsg!==''}></Alert>
                        <Form onSubmit={this.login}>
                            <div className="auth text-center">
                                <Input onChange={this.onChangeText} type='email' name='email' id='email' placeholder="Email" className="mb-3"/>
                                <Input onChange={this.onChangeText} type="password" name='password' id='password' placeholder="Password" className="mb-3"/>
                            </div>
                            <div className="text-right mb-3">
                                <Link to="#" className="text-danger">Forgot Password</Link>
                            </div>
                            <Button className="auth rounded-pill mb-3" color="danger" block>Login</Button>
                        </Form>
                        <div className="text-center">
                            Don't have Blanja Account? <Link to="/register" className="text-danger">Register</Link>
                        </div>
                    </div>
                </Container>

            </>
        )   
    }
}
const mapStateToProps = state => ({auth: state.auth})

const mapDispatchToProps = {
  login: auth.login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)