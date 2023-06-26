import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const userBlogsSlice = createSlice({
  name: 'userBlogs',
  initialState: [],
  reducers: {
    setUserBlogs(state, action) {
      return action.payload
    }
  }
})

export const { setUserBlogs } = userBlogsSlice.actions

export const initializeUserBlogs = (user) => {
  return async dispatch => {
    const userBlogs = user.blogs.map(async (blog) => {
      const blogData = await blogService.getBlog(blog.id)
      .then((result) => {
        return result
      })
      .catch((error) => {
        console.log(error)
        return null
      })
      return blogData
    })
    await Promise.all(userBlogs).then((result) => {
      const sortedUserBlogs = result.sort((a, b) => {
        return b.likes - a.likes
      })
      dispatch(setUserBlogs(sortedUserBlogs))
    })
  }
}

export default userBlogsSlice.reducer