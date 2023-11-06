import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import './index.css';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoadingProvider } from './context/LoadingContext';

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <LoadingProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
