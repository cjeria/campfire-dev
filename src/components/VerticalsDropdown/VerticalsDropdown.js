import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import classNames from 'classnames'
import $ from 'jquery'
import 'bootstrap-sass'

import { selectVertical, addVertical } from '../../store/verticals'
import './VerticalsDropdown.scss'

class VerticalsDropdown extends Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  onSubmit (e) {
    e.preventDefault()
    const { onAddVertical } = this.props

    const newVertical = _.trim(this.input.value)
    if (!newVertical) return

    onAddVertical(newVertical)

    this.closeModal()
  }

  closeModal () {
    this.input.value = ''
    $(this.modal).modal('hide')
  }

  render () {
    const { currentVertical, verticals, onSelectVertical } = this.props
    return (
      <div className='dropdown verticals-dropdown'>
        <a href='#' className='dropdown-toggle' data-toggle='dropdown'>
          <strong>{currentVertical}</strong>
          <span className='fa fa-caret-down fa-fw' />
        </a>
        <ul className='dropdown-menu'>
          <li className='dropdown-header'>
            <span className='fa fa-fw' />Verticals
          </li>
          {_.map(verticals, (vertical, index) => {
            const isCurrent = vertical === currentVertical
            return (
              <li key={index} className={classNames({ disabled: isCurrent })}>
                <a href='#' onClick={(e) => { e.preventDefault(); onSelectVertical(vertical) }}>
                  <span className={classNames('fa fa-fw', { 'fa-check': isCurrent })} />{vertical}
                </a>
              </li>
            )
          })}
          <li className='divider' />
          <li>
            <a href='#' data-toggle='modal' data-target='#new-vertical-modal'>
              <span className='fa fa-fw' />+ New Vertical
            </a>
          </li>
        </ul>
        <div className='modal fade' id='new-vertical-modal' tabIndex='-1' ref={(ref) => (this.modal = ref)}>
          <div className='modal-dialog modal-sm'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title text-center'><strong>New Vertical</strong></h4>
              </div>
              <div className='modal-body'>
                <form onSubmit={this.onSubmit}>
                  <div className='form-group'>
                    <label>Name your vertical</label>
                    <input type='text' className='form-control' ref={(ref) => (this.input = ref)} />
                  </div>
                </form>
              </div>
              <div className='modal-footer'>
                <div className='pull-right'>
                  <button className='btn btn-default' onClick={this.closeModal}>Cancel</button>
                  <button className='btn btn-default' onClick={this.onSubmit}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

VerticalsDropdown.propTypes = {
  currentVertical: PropTypes.string,
  verticals: PropTypes.arrayOf(PropTypes.string),
  onSelectVertical: PropTypes.func,
  onAddVertical: PropTypes.func
}

const mapStateToProps = (state) => ({
  currentVertical: state.verticals.currentVertical,
  verticals: _.keys(state.verticals.list)
})

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectVertical: (vertical) => {
      dispatch(selectVertical(vertical))
    },
    onAddVertical: (newVertical) => {
      dispatch(addVertical(newVertical))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalsDropdown)
