import { createContext, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({children}) => {
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [id, setId] = useState(null);

  return (
    <UserContext.Provider value={{loggedInUsername, setLoggedInUsername, id, setId}}>{children}</UserContext.Provider>
  )
}