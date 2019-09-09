import { SET_USER, SET_COLOR, SET_CREDENTIALS, SET_FRIEND_LIST, SET_FRIENDS } from './actionTypes';

export const setUser = user => ({
  type: SET_USER,
  payload: { user }
})

export const setColor = color => ({
  type: SET_COLOR,
  payload: { color }
})

export const setCredentials = credentials => ({
  type: SET_CREDENTIALS,
  payoad: { credentials }
})

export const setFriendRequests = friendRequests => ({
  type: SET_FRIEND_REQUESTS,
  payload: { friendRequests }
})

export const setFriends = friends => ({
  type: SET_FRIENDS,
  payload: { friends }
})