import React from 'react'

import VerticalsDropdown from 'components/VerticalsDropdown'
import TopLevelInput from 'components/TopLevelInput'
import CopyHtml from 'components/CopyHtml'
import DownloadHtml from 'components/DownloadHtml'
import './Toolbar.scss'

export const Toolbar = () => (
  <div className='toolbar'>

    <div className='container'>
      <div className='btn-toolbar'>
        <div className='btn-group'>
          <VerticalsDropdown />
        </div>
        <div className='pull-right'>
          <div className='btn-toolbar'>
            <CopyHtml>
              <button className='btn btn-default'>Copy HTML to clipboard</button>
            </CopyHtml>
            <DownloadHtml>
              <button className='btn btn-default'>Download HTML</button>
            </DownloadHtml>
          </div>
        </div>
      </div>
    </div>

    <div className='divider' />

    <div className='container'>
      <div className='row'>
        <div className='col-sm-3'>
          <TopLevelInput name='name' label='Name' />
        </div>
        <div className='col-sm-3'>
          <TopLevelInput name='link' label='Link URL' />
        </div>
        <div className='col-sm-6'>
          <TopLevelInput name='address' label='Address' />
        </div>
      </div>
    </div>
  </div>
)

export default Toolbar
