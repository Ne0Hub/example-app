import { Map, Record } from 'immutable'

import log from 'middleware/logger'
import { Api } from 'middleware/api'

const Dashboard = new Record({
  isLoading: false,
  hasError: false,
  errors: null,
  results: undefined
})

export const COMPONENT_LOADING = 'COMPONENT_LOADING'
export const COMPONENT_LOADED = 'COMPONENT_LOADED'

// ------------------------------------
// Actions
// ------------------------------------
export function componentLoading () {
  return {
    type: 'COMPONENT_LOADING'
  }
}

export function componentLoaded () {
  return {
    type: 'COMPONENT_LOADING'
  }
}

export const load = () => {
  return (dispatch, getState) => {
    dispatch(componentLoading())
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(componentLoaded())
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
  [COMPONENT_LOADING] : (state, action) => {
    return state.set('isLoading', true)
  },
  [COMPONENT_LOADED] : (state, action) => {
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
export default function componentReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
