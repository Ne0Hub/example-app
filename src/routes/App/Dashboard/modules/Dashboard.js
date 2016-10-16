import { Map, Record } from 'immutable'

import log from 'middleware/logger'
import { Api } from 'middleware/api'

const Dashboard = new Record({
  isLoading: false,
  hasError: false,
  errors: null,
  results: undefined
})

export const DASHBOARD_LOADING = 'DASHBOARD_LOADING'
export const DASHBOARD_LOADED = 'DASHBOARD_LOADED'

// ------------------------------------
// Actions
// ------------------------------------
export function dashboardLoading () {
  return {
    type: 'DASHBOARD_LOADING'
  }
}

export function dashboardLoaded () {
  return {
    type: 'DASHBOARD_LOADING'
  }
}

export const load = () => {
  return (dispatch, getState) => {
    dispatch(dashboardLoading())
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(dashboardLoaded())
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
  [DASHBOARD_LOADING] : (state, action) => {
    return state.set('isLoading', true)
  },
  [DASHBOARD_LOADED] : (state, action) => {
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
export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
