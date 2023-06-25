import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import BlogsList from './components/BlogsList'
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { setNotification } from './reducers/notifReducer'
import { initializeBlogs } from "./reducers/blogsReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  const dispatch = useDispatch()
  const notifTime = 3000

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

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
      <h1>Blogs</h1>
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
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>
          <BlogsList />
          <button id="logoutButton" onClick={() => handleLogout()}>
            logout
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
