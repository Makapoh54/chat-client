import React, { useState } from 'react';
import getRoutes from './routes';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UsernameContext from './contexts/chatContext';
import ChatWebSocket from './sockets/ChatWS';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [username, setUsername] = useState(null);
  const [chat, setChat] = useState(new ChatWebSocket('ws://localhost:8080'));

  return (
    <div>
      <UsernameContext.Provider value={{ chat, username, setUsername }}>
        {getRoutes().map(({ path, exact, component }) => (
          <Route key={path} path={path} exact={exact} component={component} />
        ))}
      </UsernameContext.Provider>
      <ToastContainer />
    </div>
  );
};

export default App;
