import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer'
import blogsReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'
import userBlogsReducer from './reducers/userBlogsReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer,
    userBlogs: userBlogsReducer,
    notification: notifReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store