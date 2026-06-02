import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store.js';
import {ToastContainer} from "react-toastify";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
    <ToastContainer autoClose={2000}/>
  </Provider>
  </BrowserRouter>
)
