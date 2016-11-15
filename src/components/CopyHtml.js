import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import copy from 'copy-to-clipboard'
import _ from 'lodash'

import generateHtml from 'HtmlGenerator'

const CopyHtml = ({ children, generateHtml }) => React.cloneElement(
  React.Children.only(children),
  {
    onClick: (e) => {
      copy(generateHtml())
    }
  }
)

CopyHtml.propTypes = {
  children: React.PropTypes.element.isRequired,
  generateHtml: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  generateHtml: () => {
    let parts = _.mapValues(
      state.verticals.list[state.verticals.currentVertical],
      (variants, partName) => variants[state.verticals.currentVariants[partName]])
    let inputs = state.topLevelInput

    return generateHtml(parts, inputs)
  }
})

export default connect(mapStateToProps)(CopyHtml)
