import { SET_USER, SET_COLOR, SET_CREDENTIALS, SET_FRIEND_REQUESTS, SET_FRIENDS } from '../actionTypes'

const initialState = {
  user: null,
  color: ['#FCE77D', '#F9D342'],
  friendRequests: [],
  friends: []
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

    case SET_CREDENTIALS:
      const { credentials } = action.payload;
      return {
        ...state,
        credentials: credentials
      }

    case SET_FRIEND_REQUESTS:
      const { friendRequests } = action.payload;
      return {
        ...state,
        friendRequests: friendRequests
      }

    case SET_FRIENDS:
      const { friends } = action.payload;
      return {
        ...state,
        friends: friends
      }

    default: return state;
  }
}