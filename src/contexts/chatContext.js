import { createContext } from 'react';

const Context = createContext({ chat: null, username: null, setUsername: () => {} });

export default Context;
