import React from 'react';
import getRoutes from './routes';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div>
    {getRoutes().map(({ path, exact, component }) => (
      <Route key={path} path={path} exact={exact} component={component} />
    ))}
    <ToastContainer />
  </div>
);

export default App;
