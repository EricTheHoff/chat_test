import Register from './Register';
import axios from 'axios';

const App = () => {
  axios.defaults.baseURL = 'http://localhost:4000'; // Defining base URL for axios calls.
  axios.defaults.withCredentials = true; // Allows setting cookies within our API.
  return (
    <Register/>
  )
}

export default App
