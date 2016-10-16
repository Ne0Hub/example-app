import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: '/server/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Server = require('./containers/Server').default
      const reducer = require('./modules/Server').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'server', reducer })

      /*  Return getComponent   */
      cb(null, Server)

    /* Webpack named bundle   */
    }, 'server')
  }
})
