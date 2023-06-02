import { createContext, useReducer, useContext } from 'react'

const notifReducer = (state, action) => {
  console.log(action.payload)
  return action.payload
}

const NotifContext = createContext()

export const useNotifValue = () => {
  const notifAndDispatch = useContext(NotifContext)
  return notifAndDispatch[0]
}

export const useNotifDispatch = () => {
  const notifAndDispatch = useContext(NotifContext)
  return notifAndDispatch[1]
}

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notifReducer, '')

  return (
    <NotifContext.Provider value={[notif, notifDispatch] }>
      {props.children}
    </NotifContext.Provider>
  )
}

export default NotifContext