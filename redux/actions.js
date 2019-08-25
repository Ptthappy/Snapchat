import { SET_USER, SET_COLOR } from './actionTypes';

export const setUser = user => ({
  type: SET_USER,
  payload: { user }
})

export const setColor = color => ({
  type: SET_COLOR,
  payload: { color }
})