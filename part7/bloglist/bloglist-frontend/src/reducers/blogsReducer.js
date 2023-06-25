import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    likeABlog(state, action) {
      const id = action.payload
      const blogToLike = state.find(b => b.id === id)
      const newBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }
      return state.map(blg => 
        blg.id !== id ? blg : newBlog
      ).sort((a, b) => {
        return b.likes - a.likes
      })
    },
    cancelBlog(state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { likeABlog, cancelBlog, appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAllBlogs()
    const sortedBlogs = blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    dispatch(setBlogs(sortedBlogs))
  }
}

export const addBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (id) => {
  return async dispatch => {
    await blogService.updateBlogLike(id)
    dispatch(likeABlog(id))
  }
}

export const deleteABlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(cancelBlog(id))
  }
}

export default blogSlice.reducer