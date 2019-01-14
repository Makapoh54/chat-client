import React from 'react';
import getRoutes from './routes';
import { Route } from 'react-router-dom';

const App = () => (
  <div>
    {getRoutes().map(({ path, exact, component }) => (
      <Route key={path} path={path} exact={exact} component={component} />
    ))}
  </div>
);

export default App;
