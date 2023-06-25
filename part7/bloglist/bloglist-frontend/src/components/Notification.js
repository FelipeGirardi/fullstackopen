import { useSelector } from 'react-redux'

const Notification = ({ notifType }) => {
  const message = useSelector(state => {
    return state.notification
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    visibility: message === '' ? 'hidden' : 'visible'
  }

  return (
    <div className={notifType} style={style}>
      {message}
    </div>
  )
};

export default Notification;
