import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {QueryClient} from 'react-query'
import {QueryClientProvider} from 'react-query'
import {UserContextProvider} from './context/UserContext'
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();
root.render(
  <>
  <UserContextProvider>
    <QueryClientProvider client={client}>
    <Router>
      <App />
    </Router>
    </QueryClientProvider>
    </UserContextProvider>
  </>


);


