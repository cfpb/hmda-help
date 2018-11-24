import React, { Component } from 'react'
import { BrowserRouter as Switch, Route, Link } from 'react-router-dom'
import Keycloak from 'keycloak-js'

import Search from './search/'
import Institution from './institution/'
import './App.css'

const keycloak = Keycloak(process.env.PUBLIC_URL + '/keycloak.json')

const refresh = self => {
  const updateKeycloak = () => {
    setTimeout(() => {
      keycloak.updateToken().then(success => {
        if(!success) return keycloak.login()
        self.setState({token: keycloak.token})
        updateKeycloak()
      })
    }, +(keycloak.tokenParsed.exp + '000') - Date.now() - 10000)
  }
  updateKeycloak()
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { token: null, authenticated: false }
  }

  componentDidMount() {
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      refresh(this)
      this.setState({ token: keycloak.token, authenticated: authenticated })
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
                    token: this.state.token
                  }}
                >
                  Add a new institution
                </Link>
                <button onClick={() => keycloak.logout()}>
                  Logout
                </button>
              </nav>
            </header>
            <ProtectedRoute
              exact
              path="/"
              component={Search}
              token={ this.state.token }
            />
            <ProtectedRoute
              exact
              path="/add"
              component={Institution}
              token={ this.state.token }
            />
            <ProtectedRoute
              exact
              path="/update"
              component={Institution}
              token={ this.state.token }
            />
          </div>
        </Switch>
      )
    } else {
      return <span></span>
    }
  }
}

export default App
