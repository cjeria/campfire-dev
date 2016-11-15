import React from 'react'

import EmailPreview from 'components/EmailPreview'
import PartEditor from 'components/PartEditor'
import './Builder.scss'

export const Builder = () => (
  <div className='builder'>
    <div className='container'>

      <table>
        <thead>
          <tr>
            <th>
              <ul className='nav nav-tabs'>
                <li className='active'>
                  <a href='#builder' data-toggle='tab'>
                    <strong>Campaign Builder</strong>
                  </a>
                </li>
                <li>
                  <a href='#html' data-toggle='tab'>
                    <strong>HTML</strong>
                  </a>
                </li>
              </ul>
            </th>
            <th>
              <div className='preview-label'><strong>Email Preview</strong></div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <div className='tab-content'>
                <div className='tab-pane active' id='builder'>
                  <PartEditor partName='Link Text' singleLine />
                  <PartEditor partName='Body' />
                  <PartEditor partName='Sign off' />
                </div>

                <div className='tab-pane' id='html'>
                  [TBD]
                </div>
              </div>
            </td>

            <td>
              <div className='preview'>
                <EmailPreview />
              </div>

            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
)

export default Builder
