import { createStore } from 'redux'
import { countReducer } from './count-reducer'

const store = createStore(countReducer)

export default store
