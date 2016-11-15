import _ from 'lodash'

const SELECT_VERTICAL = 'SELECT_VERTICAL'
const ADD_VERTICAL = 'ADD_VERTICAL'
const SELECT_VARIANT = 'SELECT_VARIANT'
const EDIT_VARIANT = 'EDIT_VARIANT'
const REMOVE_VARIANT = 'REMOVE_VARIANT'
const ADD_VARIANT = 'ADD_VARIANT'

const defaultParts = {
  'Link Text': {
    'Casual': 'Click here to see offer >>'
  },
  'Body': {
    'Casual': `\
Hi {{name}},

I noticed your recently visited our website - searching for an extended auto warranty.\
I hope you don't mind but I thought I'd save you some trouble and send you a link \
to our most popular coverage option right now.
`
  },
  'Sign off': {
    'Casual': `\
Just fill out the brief questions to see what the coverage will cost:

{{link}}

P.S. Should be only a fraction of the dealers' price.

Good luck!
`
  }
}

const blankParts = {
  'Link Text': {
    'Casual': ''
  },
  'Body': {
    'Casual': ''
  },
  'Sign off': {
    'Casual': ''
  }
}

const initialVerticals = _.reduce([
  'Auto Loan',
  'Auto Warranty',
  'Life Insurance',
  'Fast Cash for Homes'
], (verticals, key) => {
  verticals[key] = _.cloneDeep(blankParts)
  return verticals
}, {
  'Refinance': defaultParts
})

const initialCurrentVertical = _.findKey(initialVerticals, () => true)

const pickVariants = parts => _.mapValues(parts, part => _.findKey(part, () => true))
const initialCurrentVariants = pickVariants(initialVerticals[initialCurrentVertical])

const initialState = {
  list: initialVerticals,
  currentVertical: initialCurrentVertical,
  currentVariants: initialCurrentVariants
}

export const selectVertical = (newVertical) => ({
  type: SELECT_VERTICAL,
  newVertical
})

export const addVertical = (newVertical) => ({
  type: ADD_VERTICAL,
  newVertical
})

export const selectVariant = (part, variant) => ({
  type: SELECT_VARIANT,
  part,
  variant
})

export const editVariant = (part, value) => ({
  type: EDIT_VARIANT,
  part,
  value
})

export const removeVariant = (part) => ({
  type: REMOVE_VARIANT,
  part
})

export const addVariant = (part, variant) => ({
  type: ADD_VARIANT,
  part,
  variant
})

export default function verticalsReducer (state = initialState, action) {
  switch (action.type) {

    case ADD_VERTICAL:
      if (_.has(state.list, action.newVertical)) {
        // no-op if vertical already exists
        return state
      }
      const newVerticalParts = _.cloneDeep(blankParts)
      return {
        ...state,
        list: {
          ...state.list,
          [action.newVertical]: newVerticalParts
        },
        currentVertical: action.newVertical,
        currentVariants: pickVariants(newVerticalParts)
      }

    case SELECT_VERTICAL:
      return {
        ...state,
        currentVertical: action.newVertical,
        currentVariants: pickVariants(state.list[action.newVertical])
      }

    case SELECT_VARIANT:
      return {
        ...state,
        currentVariants: {
          ...state.currentVariants,
          [action.part]: action.variant
        }
      }

    case EDIT_VARIANT:
      return {
        ...state,
        list: {
          ...state.list,
          [state.currentVertical]: {
            ...state.list[state.currentVertical],
            [action.part]: {
              ...state.list[state.currentVertical][action.part],
              [state.currentVariants[action.part]]: action.value
            }
          }
        }
      }

    case REMOVE_VARIANT:
      if (_.size(_.keys(state.list[state.currentVertical][action.part])) < 2) {
        // don't remove last part variant
        return state
      }
      return {
        ...state,
        list: {
          ...state.list,
          [state.currentVertical]: {
            ...state.list[state.currentVertical],
            [action.part]: {
              ..._.omit(
                state.list[state.currentVertical][action.part],
                state.currentVariants[action.part])
            }
          }
        },
        currentVariants: {
          ...state.currentVariants,
          [action.part]: _.findKey(
            state.list[state.currentVertical][action.part],
            (value, key) => key !== state.currentVariants[action.part])
        }
      }

    case ADD_VARIANT:
      if (_.has(state.list[state.currentVertical][action.part], action.variant)) {
        // no-op if variant already exists
        return state
      }
      return {
        ...state,
        list: {
          ...state.list,
          [state.currentVertical]: {
            ...state.list[state.currentVertical],
            [action.part]: {
              ...state.list[state.currentVertical][action.part],
              [action.variant]: ''
            }
          }
        },
        currentVariants: {
          ...state.currentVariants,
          [action.part]: action.variant
        }
      }

    default:
      return state
  }
}
