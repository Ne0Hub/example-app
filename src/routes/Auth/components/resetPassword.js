import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import log from 'middleware/logger'

export default class ResetPassword extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    doResetPassword: PropTypes.func.isRequired
  }

  _handleResetPassword = (event) => {
    event.preventDefault()
    log.debug(this.props)
    const email = this.refs.email.value
    log.debug('_handleResetPassword() ::', email)
    this.props.doResetPassword({ email })
  }
  render () {
    const { auth } = this.props

    const _ButtonContents = () => {
      if (auth.get('isLoading')) {
        return (<i className="fa fa-spinner fa-spin fa-fw"></i>)
      } else {
        return 'Reset Password'
      }
    }

    return (<div className="card card-container">
      <h1>SAP Infrastructure</h1>
      {(auth.get('resetPassword') && !auth.get('isLoading'))
        ? <p className='well'>You should receive an email shortly with a link to reset your password.</p>
        : <form className="form-signin">
          <input
            type="email"
            ref="email"
            id="email"
            className="form-control"
            placeholder="Email"
            required
            autoFocus />
          <button
            className="btn btn-lg btn-primary btn-block btn-signin"
            type="submit"
            disabled={(auth.get('isLoading'))}
            onClick={this._handleResetPassword}>
            {_ButtonContents()}
          </button>
        </form>
      }
    </div>)
  }
}
