import { UserContextProvider } from './UserContext';
import axios from 'axios';
import Routes from './Routes';

const App = () => {
  axios.defaults.baseURL = 'http://localhost:4000'; // Defining base URL for axios calls.
  axios.defaults.withCredentials = true; // Allows setting cookies within our API.

  return (
    <UserContextProvider>
      <Routes/>
    </UserContextProvider>
  )
}

export default App
