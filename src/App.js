import React, { Component } from 'react'
import { BrowserRouter as Switch, Route } from 'react-router-dom'

import Search from './Search'
import InstitutionForm from './InstitutionForm'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <div className="App">
          <h1 className="App-title">HMDA Help</h1>

          <Route exact path="/" component={Search} />
          <Route exact path="/add" component={InstitutionForm} />
          <Route exact path="/update" component={InstitutionForm} />
        </div>
      </Switch>
    )
  }
}

export default App
