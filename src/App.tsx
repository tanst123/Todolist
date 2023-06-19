// https://ant.design/components/input
// https://github.com/ant-design/ant-design/tree/master/components/input

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeView from "./home/view/HomeView";
import TodolistView from "./todolist/view/TodolistView";
import CounterView from "./counter/view/CounterView";
import TiktokView from "./tiktok/view/TiktokView";
import NotFoundView from "./notfound/view/NotFoundView";

const App:React.FC = () => {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: "#f3f3f3" }}>
        <Routes>
          <Route path="/" element={<HomeView><></></HomeView>} />
          <Route
            path="/todolist"
            element={
              <HomeView>
                <TodolistView />
              </HomeView>
            }
          />
          <Route
            path="/counter"
            element={
              <HomeView>
                <CounterView />
              </HomeView>
            }
          />
          <Route
            path="/tiktok"
            element={
              <HomeView>
                <TiktokView />
              </HomeView>
            }
          />
          <Route path="/" element={<NotFoundView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
