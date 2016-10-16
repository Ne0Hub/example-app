// We only need to import the modules necessary for initial render
import AppRoute from './App'
import AuthRoute from './Auth'
import HomeRoute from './Home'

import BaseLayout from 'layouts/BaseLayout/BaseLayout'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import AuthLayout from 'layouts/AuthLayout/AuthLayout'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
import { Authenticated } from 'containers/Authenticated'
import { transitionTo } from 'containers/transitionTo'

export const createRoutes = (store) => {
  return {
    path        : '/',
    component   : transitionTo(BaseLayout),
    indexRoute  : HomeRoute,
    childRoutes  : [
      {
        childRoutes: [
          AuthRoute(store)
        ]
      },
      {
        childRoutes: [
          AppRoute(store)
        ]
      }
    ]
  }
}

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
