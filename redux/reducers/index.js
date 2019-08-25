import { SET_USER, SET_COLOR } from '../actionTypes'
import { AsyncStorage } from 'react-native'

const initialState = {
  user: null,
  color: ['#FCE77D', '#F9D342']
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_USER: {
      const { user } = action.payload
      return {
        ...state, 
        user: user
      }
    }

    case SET_COLOR: {
      const { color } = action.payload;
      return {
        ...state,
        color: color
      }
    }

    default: return state;
  }
}