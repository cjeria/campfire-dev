import React from 'react'
import { IndexLink } from 'react-router'
import './Header.scss'

export const Header = () => (
  <nav className='navbar navbar-inverse'>
    <div className='container'>
      <div className='navbar-header'>
        <IndexLink to='/' className='navbar-brand'>
          <div>
            <img src='logo.svg' />
            <strong>Campfire</strong>
          </div>
        </IndexLink>
      </div>
    </div>
  </nav>
)

export default Header
