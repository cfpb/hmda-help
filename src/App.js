import React, { Component } from 'react'
import { BrowserRouter as Switch, Route, Link } from 'react-router-dom'
import Keycloak from 'keycloak-js'

import Search from './search/'
import Institution from './institution/'
import './App.css'

const keycloak = Keycloak(process.env.PUBLIC_URL + '/keycloak.json')

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
    const ProtectedRoute = ({ component: Component, ...rest }) => {
      return (
        <Route
          {...rest}
          render={props => <Component {...props} token={rest.token} />}
        />
      )
    }

    if (this.state.authenticated) {
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
                        lei: '',
                        taxId: '',
                        respondentName: ''
                      }
                    },
                    token: this.state.keycloak.token
                  }}
                >
                  Add a new institution
                </Link>
                <button onClick={() => this.state.keycloak.logout()}>
                  Logout
                </button>
              </nav>
            </header>
            <ProtectedRoute
              exact
              path="/"
              component={Search}
              token={this.state.keycloak ? this.state.keycloak.token : null}
            />
            <ProtectedRoute
              exact
              path="/add"
              component={Institution}
              token={this.state.keycloak ? this.state.keycloak.token : null}
            />
            <ProtectedRoute
              exact
              path="/update"
              component={Institution}
              token={this.state.keycloak ? this.state.keycloak.token : null}
            />
          </div>
        </Switch>
      )
    } else {
      return <h1>Please authenticate!</h1>
    }
  }
}

export default App
