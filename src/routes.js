import endpoints from './constants/endpoints';
import LandingPage from './components/LandingPage';
import Chat from './components/Chat';

const routes = [{ endpoint: endpoints.BASE, component: LandingPage }, { endpoint: endpoints.CHAT, component: Chat }];

const getRoutes = () => {
  return routes.map(({ endpoint, component }) => ({
    path: `/${endpoint}`,
    exact: true,
    component,
  }));
};

export default getRoutes;
