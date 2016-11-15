import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeTopLevelInput } from 'store/topLevelInputReducer'

export const TopLevelInput = ({ value, onChange, name, label }) => (
  <div>
    <label>{label}</label>
    <input type='text' className='form-control' value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
)

TopLevelInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,

  // ownProps
  name: PropTypes.string.isRequired,
  label: PropTypes.string
}

const mapStateToProps = (state, ownProps) => ({
  value: state.topLevelInput[ownProps.name]
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (value) => {
      dispatch(changeTopLevelInput(ownProps.name, value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopLevelInput)

