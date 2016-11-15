
const CHANGE_TOP_LEVEL_INPUT = 'CHANGE_TOP_LEVEL_INPUT'

export const changeTopLevelInput = (key, value) => ({
  type: CHANGE_TOP_LEVEL_INPUT,
  key,
  value
})

const initialState = {
  name: '',
  link: '',
  address: ''
}

export default function topLevelInputReducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_TOP_LEVEL_INPUT:
      return { ...state, [action.key]: action.value }
    default:
      return state
  }
}

