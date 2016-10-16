import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Button, ButtonGroup } from 'react-bootstrap'

import log from 'middleware/logger'

/* eslint-disable no-unused-vars */
import styles from './login.scss'
/* eslint-enable no-unused-vars */

export default class LoginView extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    doLogin: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      loginType: 'local'
    }
  }

  _handleToggleChange = (value) => {
    this.setState({ loginType: (this.state.loginType === 'local') ? 'ldap' : 'local' })
  }

  _handleLogin = (event) => {
    event.preventDefault()
    const identity = this.refs.identity.value
    const password = this.refs.password.value
    log.debug('_handleLogin() ::', identity, password)
    const user = {
      identity,
      password,
      loginType: this.state.loginType
    }
    this.props.doLogin(user)
  }
  render () {
    const { auth } = this.props

    const _ButtonContents = () => {
      if (auth.get('isLoading')) {
        return (<i className='fa fa-spinner fa-spin fa-fw'></i>)
      } else {
        return 'Sign In'
      }
    }
    const _classNames = {
      local: 'btn btn-xs btn-info',
      ldap: 'btn btn-xs btn-info'
    }

    _classNames[this.state.loginType] += 'active'

    return (<div className='card card-container'>
      <h2>SAP Infrastructure</h2>
      <form className='form-signin'>
        <input
          type='text'
          ref='identity'
          id='identity'
          className='form-control'
          placeholder='Email or Username'
          required
          autoFocus />
        <input
          type='password'
          ref='password'
          id='password'
          className='form-control'
          placeholder='Password'
          required />
        <ButtonGroup>
          <Button
            bsStyle={(this.state.loginType === 'local') ? 'primary' : null}
            bsSize='xsmall'
            active={(this.state.loginType === 'local')}
            onClick={this._handleToggleChange}
          >
            local
          </Button>
          <Button
            bsStyle={(this.state.loginType === 'ldap') ? 'primary' : null}
            bsSize='xsmall'
            active={(this.state.loginType === 'ldap')}
            onClick={this._handleToggleChange}
          >
            ldap
          </Button>
        </ButtonGroup>
        <button
          className='btn btn-lg btn-primary btn-block btn-signin submit'
          type='submit'
          disabled={(auth.get('isLoading'))}
          onClick={this._handleLogin}>
          {_ButtonContents()}
        </button>
      </form>
      <Link to='/auth/resetPassword' className='forgot-password'>Forgot the password?</Link>
    </div>)
  }
}
