import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './tiktok/component/ThemeContext';
import { ProviderStore } from './notfound/store';
import ProviderTodo from './todolist/component/ContextTodo';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <ProviderTodo>
      <ProviderStore>
        <ThemeProvider>
            <App />
        </ThemeProvider>
      </ProviderStore>
    </ProviderTodo>
  </React.StrictMode> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
