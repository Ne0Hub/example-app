require('es6-promise').polyfill()
import 'whatwg-fetch'
import lodash from 'lodash'
import log from 'middleware/logger'

const ApiBase = 'http://localhost:1337/api/v1.0'
function _buildUrl (endpoint, params) {
  let url = ''

  let finalParams = ''
  lodash.each(params, (p, k) => {
    finalParams = finalParams + '&' + k + '=' + p
  })
  url = ApiBase + endpoint
  return url
}

export const Api = {
  get: function (route, params) {
    const url = _buildUrl(route, params)
    log.debug('Api::get::initial', url, params)
    return fetch(_buildUrl(url), {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => {
      log.debug('Api::get::response', route, { response })
      return response.json()
    }).catch((err) => {
      return { msg: 'GENERAL_API_CATCH', err: err }
    })
  },

  post: function (route, payload) {
    return fetch(_buildUrl(route), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 12345'
      },
      body: JSON.stringify(payload)
    })
    .then((response) => {
      log.debug('Api::get::response', route, response)
      return response.json()
    }).catch((err) => {
      return { msg: 'GENERAL_API_CATCH', err: err }
    })
  },
  put: function (endpoint, params) {
    return new Promise((resolve, reject) => {
      if (lodash.isEmpty(params)) {
        return reject({ msg: 'No update data provided', type: 'error' })
      }
    })
  },
  delete: function (endpoint, params) {
    return new Promise((resolve, reject) => {
      if (lodash.isEmpty(params)) {
        return reject({msg: 'No delete data provided', type: 'error'})
      }
    })
  }
}
