import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import $ from 'jquery'
import classNames from 'classnames'
import {
  selectVariant,
  editVariant,
  removeVariant,
  addVariant
} from '../../store/verticals'

import './PartEditor.scss'

class PartEditor extends Component {

  constructor (props) {
    super(props)
    _.forEach(
      ['onSubmitNewDraft', 'closeModal', 'showModal'],
      method => { this[method] = this[method].bind(this) })
  }

  onSubmitNewDraft (e) {
    e.preventDefault()
    const { onAddVariant } = this.props

    const newVariant = _.trim(this.modalInput.value)
    if (!newVariant) return

    onAddVariant(newVariant)

    this.closeModal()
  }

  showModal () {
    $(this.modal).modal('show')
  }

  closeModal () {
    this.modalInput.value = ''
    $(this.modal).modal('hide')
  }

  render () {
    const {
      partName,
      singleLine,
      currentVariant,
      variants,
      onSelectVariant,
      onEdit,
      onRemoveVariant
    } = this.props

    return (
      <div className='part-editor'>

        <label className='editor-label'>{partName}</label>
        <button className='btn btn-default invisible'>X</button>

        <div className='pull-right part-toolbar'>
          <span>Drafts:&nbsp;</span>
          <div className='dropdown btn-group'>
            <button className='btn btn-default dropdown-toggle' data-toggle='dropdown'>
              {currentVariant} <span className='caret' />
            </button>
            <ul className='dropdown-menu'>
              {_.map(_.keys(variants), (variant, index) => {
                const isCurrent = variant === currentVariant
                return (
                  <li key={index} className={classNames({ disabled: isCurrent })}>
                    <a href='#' onClick={(e) => { e.preventDefault(); onSelectVariant(variant) }}>
                      <span className={classNames('fa fa-fw', { 'fa-check': isCurrent })} />{variant}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <button
            className='btn btn-default'
            onClick={this.showModal}
          >
            <i className='fa fa-plus text-muted' />
          </button>

          <button
            className='btn btn-default'
            onClick={onRemoveVariant}
            disabled={_.size(variants) < 2}
          >
            <i className='fa fa-trash text-muted' />
          </button>
        </div>

        {singleLine
          ? <input
            className='form-control'
            value={variants[currentVariant]}
            onChange={e => onEdit(e.target.value)}
          />
          : <textarea
            className='form-control'
            value={variants[currentVariant]}
            onChange={e => onEdit(e.target.value)}
            rows={8}
          />
        }

        {/* New draft modal */}
        <div className='modal fade' tabIndex='-1' ref={(ref) => (this.modal = ref)}>
          <div className='modal-dialog modal-sm'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title text-center'><strong>New Draft</strong></h4>
              </div>
              <div className='modal-body'>
                <form onSubmit={this.onSubmitNewDraft}>
                  <div className='form-group'>
                    <label>Name your draft</label>
                    <input type='text' className='form-control' ref={(ref) => (this.modalInput = ref)} />
                  </div>
                </form>
              </div>
              <div className='modal-footer'>
                <div className='pull-right'>
                  <button className='btn btn-default' onClick={this.closeModal}>Cancel</button>
                  <button className='btn btn-default' onClick={this.onSubmitNewDraft}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

PartEditor.propTypes = {
  partName: PropTypes.string.isRequired,
  singleLine: PropTypes.bool,
  currentVariant: PropTypes.string.isRequired,
  variants: PropTypes.object.isRequired,
  onSelectVariant: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemoveVariant: PropTypes.func.isRequired,
  onAddVariant: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  currentVariant: state.verticals.currentVariants[ownProps.partName],
  variants: state.verticals.list[state.verticals.currentVertical][ownProps.partName]
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectVariant: (variant) => {
      dispatch(selectVariant(ownProps.partName, variant))
    },
    onRemoveVariant: () => {
      dispatch(removeVariant(ownProps.partName))
    },
    onEdit: (value) => {
      dispatch(editVariant(ownProps.partName, value))
    },
    onAddVariant: (variant) => {
      dispatch(addVariant(ownProps.partName, variant))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartEditor)
