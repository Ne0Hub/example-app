import { injectReducer } from 'store/reducers'
import { Authenticated } from 'containers/Authenticated'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'

export default (store) => ({
  path: '/app',
  component: Authenticated(CoreLayout),
  /*  Async getComponent is only invoked when route matches   */
  getIndexRoute (location, next) {
    require.ensure([
      './Dashboard'
    ], (require) => {
      const Dashboard = require('./Dashboard').default(store)
      next(null, Dashboard)
    })
  },
  getComponent (nextState, next) {
    require.ensure([
      './Dashboard',
      './Dashboard/modules/Dashboard'
    ], (require) => {
      const Dashboard = require('./Dashboard/containers/Dashboard').default
      const reducer = require('./Dashboard/modules/Dashboard').default
      injectReducer(store, { key: 'dashboard', reducer })
      next(null, Dashboard)
    })
  },
  getChildRoutes (location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./Server').default(store),
        require('./Component').default(store)
      ])
    })
  }
})
