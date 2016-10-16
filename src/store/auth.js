import { Map, Record } from 'immutable'
import { browserHistory } from 'react-router'
import log from 'middleware/logger'
import { actions as Notification } from 'store/notification'

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'
export const AUTH_LOGOUT_REQUEST = 'AUTH_LOGOUT_REQUEST'
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS'
export const AUTH_RESETPW_REQUEST = 'AUTH_RESETPW_REQUEST'
export const AUTH_RESETPW_SUCCESS = 'AUTH_RESETPW_SUCCESS'
export const AUTH_NOT_LOGGED_IN = 'AUTH_NOT_LOGGED_IN'

import { Api } from 'middleware/api'

const Auth = new Record({
  isLoading: false,
  isAuthenticated: false,
  resetPassword: false,
  hasError: false,
  errors: null,
  token: undefined,
  user: undefined
})

const _DISABLE_LOCAL_STORAGE_ = false
export function authResetPasswordRequest (payload) {
  return {
    type: AUTH_RESETPW_REQUEST,
    payload
  }
}

export function authResetPasswordSuccess () {
  return {
    type: AUTH_RESETPW_SUCCESS
  }
}
export function authLogoutRequest () {
  return {
    type: AUTH_LOGOUT_REQUEST
  }
}
export function authLogoutSuccess () {
  return {
    type: AUTH_LOGOUT_SUCCESS
  }
}
export function authLoginRequest (payload) {
  return {
    type: AUTH_LOGIN_REQUEST,
    payload
  }
}
export function authLoginSuccess (payload) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload
  }
}
export function authLoginFailure (payload) {
  return {
    type: AUTH_LOGIN_FAILURE,
    payload
  }
}

export function authNotLoggedIn (payload) {
  return {
    type: AUTH_NOT_LOGGED_IN,
    payload
  }
}

export const _getToken = () => {
  localStorage.getItem('token')
}

export function _decodeToken (token) {
  if (token || token !== 'undefined') {
    return window.atob(token.split('.')[1])
  }
}

export function _removeToken () {
  localStorage.removeItem('token')
}

export function _removeUser () {
  localStorage.removeItem('user')
}

export function _storeToken (token) {
  if (token || token !== 'undefined') {
    localStorage.setItem('token', token)
  }
}

export function _storeUser (user) {
  if (user || user !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user))
  }
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

export const setup = () => {
  return (dispatch, getState) => {
    var token = localStorage.getItem('token')
    var user = JSON.parse(localStorage.getItem('user'))
    dispatch(authLoginSuccess({ user, token }))
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    dispatch(authLogoutRequest())

    // mock backend call
    dispatch(authLogoutSuccess())
  }
}

export const login = (payload) => {
  return (dispatch, getState) => {
    dispatch(authLoginRequest(payload))
    log.debug('Auth::login::initial', payload)
    Api.post('/auth/login/' + payload.loginType, {
      identity: payload.identity,
      password: payload.password
    })
    .then((response) => {
      if (response.status >= 200 && response.status <= 300) {
        log.debug('Auth::login::checkStatus', response)
        return response
      } else if (response.status === 401) {
        log.debug('Auth::login::checkStatus', response)
        throw response
      } else {
        log.debug('Auth::login::checkStatus', response)
        return response
      }
    })
    .then(({ token, user }) => {
      log.debug('Auth::login::response', token, user)
      dispatch(authLoginSuccess({ token, user }))
      dispatch(browserHistory.push('/app'))
    })
    .catch((err) => {
      dispatch(authNotLoggedIn(err))
      if (err.status === 401) {
        dispatch(logout())
      }
      dispatch(Notification.emit({
        type: (err.type === 'ERROR') ? 'danger' : err.type,
        msg: err.msg,
        title: err.title || null,
        dissmisable: true
      }))
    })
  }
}

export const resetPassword = (payload) => {
  return (dispatch, getState) => {
    dispatch(authResetPasswordRequest(payload))
    log.debug('Auth::resetPassword()::', payload)

    // mock backend call
    setTimeout(() => {
      const user = {
        token: '1234',
        user: {
          username: 'stubuser',
          firstName: 'test',
          lastName: 'user',
          email: 'test@test.com'
        }
      }
      dispatch(authResetPasswordSuccess({ user: user.user }))
    }, 3000)
  }
}
export const actions = {
  login,
  logout,
  resetPassword,
  setup,
  _getToken,
  isAuthenticated
}

const initialState = new Auth({
  isLoading: false,
  isAuthenticated: false,
  resetPassword: false,
  hasError: false,
  errors: []
})

const ACTION_HANDLERS = {
  [AUTH_LOGIN_REQUEST]: (state, { payload }) => {
    return state.set('isLoading', true)
  },
  [AUTH_LOGIN_SUCCESS]: (state, { payload }) => {
    if (!_DISABLE_LOCAL_STORAGE_) {
      _storeToken(payload.token)
      _storeUser(payload.user)
    }
    return state.set('isLoading', false)
    .set('token', payload.token)
    .set('user', payload.user)
    .set('isAuthenticated', true)
  },
  [AUTH_LOGIN_FAILURE]: (state, { payload }) => {
    return state.set('isLoading', false)
    .set('hasError', true)
    .set('errors', payload)
  },
  [AUTH_RESETPW_REQUEST]: (state, { payload }) => {
    return state.set('isLoading', true)
    .set('resetPassword', false)
  },
  [AUTH_RESETPW_SUCCESS]: (state, { payload }) => {
    return state.set('isLoading', false)
    .set('resetPassword', true)
  }
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
