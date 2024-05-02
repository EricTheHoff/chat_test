import Register from './Register';
import axios from 'axios';
import { UserContextProvider } from './UserContext';

const App = () => {
  axios.defaults.baseURL = 'http://localhost:4000'; // Defining base URL for axios calls.
  axios.defaults.withCredentials = true; // Allows setting cookies within our API.

  return (
    <UserContextProvider>
      <Register/>
    </UserContextProvider>
  )
}

export default App
