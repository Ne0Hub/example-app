import React from 'react'
import './Header.scss'

import log from 'middleware/logger'
import Navigation from 'containers/Navigation'
import Notification from 'containers/Notification'

export const Header = (props) => {
  return (<div className='page-container'>
    <Navigation />
    <Notification />
  </div>)
}

export default Header
