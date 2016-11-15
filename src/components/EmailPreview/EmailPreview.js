import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import generateHtml from 'HtmlGenerator'
import './EmailPreview.scss'

export const EmailPreview = ({ parts, inputs }) => (
  <div dangerouslySetInnerHTML={{__html: generateHtml(parts, inputs)}} />
)

EmailPreview.propTypes = {
  parts: PropTypes.object,
  inputs: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    parts: _.mapValues(
      state.verticals.list[state.verticals.currentVertical],
      (variants, partName) => variants[state.verticals.currentVariants[partName]]),
    inputs: state.topLevelInput
  }
}

export default connect(mapStateToProps)(EmailPreview)
