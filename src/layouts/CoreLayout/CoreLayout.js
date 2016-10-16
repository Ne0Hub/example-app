import React from 'react'
import Header from '../../components/Header'

import log from 'middleware/logger'

import './CoreLayout.scss'
export const CoreLayout = ({ children }) => {
  log.debug('CoreLayout', children)
  return (<div className='container text-center core-layout__viewport'>
    <Header {...this.props} />
    {children}
  </div>)
}

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
