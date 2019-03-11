import { createContext } from 'react';

export const { Provider, Consumer } = createContext({ username: null, setUsername: () => {} });
