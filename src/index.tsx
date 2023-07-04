import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./tiktok/component/ThemeContext";
import { ProviderStore } from "./notfound/store";
import ProviderTodo from "./todolist/component/ContextTodo";
//  const root = ReactDOM.createRoot(document.getElementById("root"));
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import { Provider } from "react-redux";


// Start Store
const store = configureStore({reducer: {counter: counterReducer}})
export type RootState = ReturnType<typeof store.getState>
export type AppDispacth = typeof store.dispatch
// End Store


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <ProviderTodo>
    <ProviderStore>
      <ThemeProvider>
        <Provider store={store}>
            <App />
        </Provider>
      </ThemeProvider>
    </ProviderStore>
  </ProviderTodo>,
  /* </React.StrictMode>  */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
