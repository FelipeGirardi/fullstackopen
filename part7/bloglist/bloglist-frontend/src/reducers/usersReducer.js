import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const { setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    const sortedUsers = users.sort((a, b) => {
      return a.name > b.name
    })
    dispatch(setUsers(sortedUsers))
  }
}

export default userSlice.reducer