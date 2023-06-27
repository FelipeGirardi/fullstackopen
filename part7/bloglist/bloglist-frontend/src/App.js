import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Menu from './components/Menu'
import blogService from "./services/blogs"
import loginService from "./services/login"
import { setNotification } from './reducers/notifReducer'
import { initializeBlogs } from "./reducers/blogsReducer"
import { initializeUsers } from "./reducers/usersReducer"
import AppRoutes from './AppRoutes'
import { Page, Title } from './styles'

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notificationType, setNotificationType] = useState("")

  const dispatch = useDispatch()
  const notifTime = 3000

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, [])

  const currentBlogs = useSelector(state => {
    return state.blogs
  })
  const currBlogs = [...currentBlogs]

  const currentUsers = useSelector(state => {
    return state.users
  })
  const currUsers = [...currentUsers]

  // -- handles

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setNotification("User logged in", notifTime))
      setNotificationType("confirm");
      setTimeout(() => {
        dispatch(setNotification('', notifTime));
      }, 5000);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("Error: wrong credentials", notifTime))
      setNotificationType("error");
      setTimeout(() => {
        dispatch(setNotification('', notifTime))
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  return (
    <div>
      <Page>
        <Notification notifType={notificationType} />
        {!user && (
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        )}
        {user && (
          <div>
            <Menu username={user.name} handleLogout={handleLogout} />
            <h1 style={{textAlign: "center"}}>Blog app</h1>
            <AppRoutes blogs={currBlogs} users={currUsers} />
          </div>
        )}
        </Page>
      </div>
  );
};

export default App;
