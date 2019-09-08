import { SET_USER, SET_COLOR, SET_CREDENTIALS } from './actionTypes';

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