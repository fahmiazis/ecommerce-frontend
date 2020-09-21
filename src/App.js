import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Product from './pages/Product'
import Home from './pages/Home'

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/product" component={Product} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App