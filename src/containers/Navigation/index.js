import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

import NavigationItem from 'containers/Navigation/Item'
import log from 'middleware/logger'

import styles from './style.scss'
export class Navigation extends React.Component {
  static contextTypes = {
    router: React.PropTypes.any
  }

  render () {
    log.debug(this)
    const { auth } = this.props
    const { router } = this.context

    const user = auth.get('user')
    // const _isAdmin = () => {
    //   return user.groups.some((g) => g.accessLevel >= 2)
    // }

    let _isActive = (path) => {
      if (router.isActive(path)) {
        return true
      } else {
        return null
      }
    }
    return (<div className='Navigation'>
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a className='navbar-brand' href='#'>SAP Infrastructure</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href='/' active={_isActive('/')}>Dashboard</NavItem>
            <NavItem eventKey={1} href='/server' active={_isActive('/server')}>Server</NavItem>
            <NavItem eventKey={1} href='/component' active={_isActive('/component')}>Component</NavItem>
            <NavItem eventKey={1} href='/location' active={_isActive('/location')}>Location</NavItem>
          </Nav>
          <Nav pullRight>
            <NavDropdown title={'Hello'} id='welcome-message' className='profile-menu'>
              <MenuItem className='text-center' >
                <img src='http://lorempixel.com/100/100/' className='img-circle' />
              </MenuItem>
              <MenuItem>
                <h4 className='fullName text-center'>Test User</h4>
              </MenuItem>
              <MenuItem divider />
              <MenuItem href='/user/changePassword'>Change Password</MenuItem>
              <MenuItem divider />
              <MenuItem href='/logout'>Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>)
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
})
export default connect(mapStateToProps)(Navigation)
