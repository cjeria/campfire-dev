import { combineReducers } from 'redux'

import locationReducer from './location'
import verticalsReducer from './verticals'
import topLevelInputReducer from './topLevelInputReducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    verticals: verticalsReducer,
    topLevelInput: topLevelInputReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
