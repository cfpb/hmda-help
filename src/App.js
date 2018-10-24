import React, { Component } from 'react'
import { BrowserRouter as Switch, Route, Link } from 'react-router-dom'
import Keycloak from 'keycloak-js'

import Search from './search/'
import Institution from './institution/'
import './App.css'

const keycloak = Keycloak('/keycloak.json')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { keycloak: null, authenticated: false }
  }

  componentDidMount() {
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated })
    })
  }

  render() {
    console.log('keycloak', this.state.keycloak)
    return (
      <Switch basename="/hmda-help">
        <div className="App">
          <header>
            <h1 className="App-title">HMDA Help</h1>
            <nav>
              <Link to="/">Search</Link>
              <Link
                to={{
                  pathname: '/add',
                  state: {
                    institution: {
                      LEI: '',
                      taxId: '',
                      respondentName: ''
                    }
                  }
                }}
              >
                Add a new institution
              </Link>
              <button onClick={() => this.state.keycloak.logout()}>
                Logout
              </button>
            </nav>
          </header>
          <Route exact path="/" component={Search} />
          <Route exact path="/add" component={Institution} />
          <Route exact path="/update" component={Institution} />
        </div>
      </Switch>
    )
  }
}

export default App
