import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Provider} from "react-redux"

import Product from './pages/Product'
import Home from './pages/Home'
import Login from './pages/Login'
import RegisterCustomer from './pages/RegisterCustomer'
import RegisterSeller from './pages/RegisterSeller'
import Cart from './pages/Cart'
import Detail from './pages/Detail'

import store from "./redux/store"

class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/product" component={Product} />
          <Route path='/login' render ={(props)=><Login {...props} />} />
          <Route path="/register/seller" component={RegisterSeller}/>
          <Route path="/register" component={RegisterCustomer}/>
          <Route path="/detail" component={Detail} />
          <Route path="/cart" render={(props)=><Cart {...props}/>}/>
        </Switch>
      </BrowserRouter>
      </Provider>
    )
  }
}

export default App