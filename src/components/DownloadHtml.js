import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import generateHtml from 'HtmlGenerator'

const DownloadHtml = ({ children, generateHtml }) => React.cloneElement(
  React.Children.only(children),
  {
    onClick: (e) => {
      const data = generateHtml()
      const link = document.createElement('a')
      const type = 'text/html;charset=utf-8'
      const filename = 'email.html'

      link.setAttribute('href', encodeURI('data:' + type + ',' + data))
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
)

DownloadHtml.propTypes = {
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

export default connect(mapStateToProps)(DownloadHtml)
