import React, { Component, lazy, Suspense } from 'react'
import { BrowserRouter as Switch, Route } from 'react-router-dom'
import Keycloak from 'keycloak-js'

import './App.css'

const NotAuthorized = lazy(() => import('./NotAuthorized'))
const Header = lazy(() => import('./Header'))
const Search = lazy(() => import('./search/'))
const Institution = lazy(() => import('./institution/'))

const keycloak = Keycloak(process.env.PUBLIC_URL + '/keycloak.json')

const refreshToken = self => {
  const updateKeycloak = () => {
    setTimeout(() => {
      keycloak
        .updateToken(20)
        .success(refreshed => {
          if (refreshed) {
            self.setState({
              token: keycloak.token,
              tokenParsed: keycloak.tokenParsed
            })
          }
          updateKeycloak()
        })
        .error(() => {
          return keycloak.login()
        })
    }, +(keycloak.tokenParsed.exp + '000') - Date.now() - 10000)
  }
  updateKeycloak()
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      tokenParsed: null,
      authenticated: false,
      authorized: false
    }
  }

  componentDidMount() {
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      refreshToken(this)
      this.setState({
        token: keycloak.token,
        tokenParsed: keycloak.tokenParsed,
        authenticated: authenticated,
        authorized: keycloak.hasResourceRole('hmda-admin', 'hmda2-api')
      })
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
      if (this.state.authorized) {
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Switch basename="/hmda-help">
              <React.Fragment>
                <Header token={this.state.token} logout={keycloak.logout} />
                <ProtectedRoute
                  exact
                  path="/"
                  component={Search}
                  token={this.state.token}
                />
                <ProtectedRoute
                  exact
                  path="/add"
                  component={Institution}
                  token={this.state.token}
                />
                <ProtectedRoute
                  exact
                  path="/update"
                  component={Institution}
                  token={this.state.token}
                />
              </React.Fragment>
            </Switch>
          </Suspense>
        )
      } else {
        return <NotAuthorized />
      }
    }
    // not logged in
    return <span />
  }
}

export default App
