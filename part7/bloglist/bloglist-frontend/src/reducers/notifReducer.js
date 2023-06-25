import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    setNotif(state, action) {
      return action.payload
    },
  }
})

export const { setNotif } = notifSlice.actions

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(setNotif(content))
    setTimeout(() => {
      dispatch(setNotif(''))
    }, time)
  }
}

export default notifSlice.reducer