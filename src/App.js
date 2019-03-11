import React from 'react';
import getRoutes from './routes';
import { Route } from 'react-router-dom';
import { useState } from 'react-hooks';
import { ToastContainer } from 'react-toastify';
import { Provider as UsernameProvider } from './contexts/usernameContext';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [username, setUsername] = useState(null);
  return (
    <div>
      <UsernameProvider value={(username, setUsername)}>
        {getRoutes().map(({ path, exact, component }) => (
          <Route key={path} path={path} exact={exact} component={component} />
        ))}
        <ToastContainer />
      </UsernameProvider>
    </div>
  );
};

export default App;
