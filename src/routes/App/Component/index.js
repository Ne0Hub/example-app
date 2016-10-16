import { injectReducer } from 'store/reducers'

import ComponentDetail from './routes/Detail'
import ComponentCreate from './routes/Create'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  path: '/component',
  childRoutes : [
    ComponentDetail,
    ComponentCreate
  ],
  getIndexRoute (location, next) {
    require.ensure([
      './routes/List'
    ], (require) => {
      const List = require('./routes/List').default(store)
      next(null, List)
    })
  },
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/ComponentList',
      './modules/Component'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ComponentList = require('./containers/ComponentList').default
      const reducer = require('./modules/Component').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'component', reducer })

      /*  Return getComponent   */
      cb(null, ComponentList)

    /* Webpack named bundle   */
    }, 'component')
  }
})
