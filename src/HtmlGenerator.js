import _ from 'lodash'

export const generateHtml = (parts, inputs) => {
  let paragraphs = _.map([
    ..._.split(parts['Body'], /\n\s*\n/g),
    ..._.split(parts['Sign off'], /\n\s*\n/g),
    inputs.address
  ], para => {
    para = _.trim(para)
    para = _.escape(para)
    para = _.replace(para, /\n/g, '<br/>\n')
    para = _.replace(para, /{{name}}/g, inputs.name)
    para = _.replace(para, /{{link}}/g, `<a href="${inputs.link}" target="_blank">${parts['Link Text']}</a>`)

    if (!para) return ''

    return `<p>\n${para}\n</p>`
  })

  return paragraphs.join('\n')
}

export default generateHtml
