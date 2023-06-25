import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer'
import blogsReducer from './reducers/blogsReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notifReducer
  }
})

export default store