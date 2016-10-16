import { Map, Record } from 'immutable'

import log from 'middleware/logger'
import { Api } from 'middleware/api'

const Dashboard = new Record({
  isLoading: false,
  hasError: false,
  errors: null,
  results: undefined
})

export const SERVER_LOADING = 'SERVER_LOADING'
export const SERVER_LOADED = 'SERVER_LOADED'

// ------------------------------------
// Actions
// ------------------------------------
export function serverLoading () {
  return {
    type: 'SERVER_LOADING'
  }
}

export function serverLoaded () {
  return {
    type: 'SERVER_LOADING'
  }
}

export const load = () => {
  return (dispatch, getState) => {
    dispatch(serverLoading())
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(serverLoaded())
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  load
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SERVER_LOADING] : (state, action) => {
    return state.set('isLoading', true)
  },
  [SERVER_LOADED] : (state, action) => {
    return state
    .set('isLoading', false)
    .set('results', action.payload.results)
  }
}

const initialState = new Dashboard({
  isLoading: false,
  hasError: false,
  errors: null,
  results: []
})
export default function serverReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
