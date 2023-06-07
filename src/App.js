import { BrowserRouter as Router,Route, Routes} from "react-router-dom";
import CounterView from "./counter/view/CounterView";
import HomeView from "./home/view/HomeView"
import TodolistView from "./todolist/view/TodolistView";
import TitTokView from "./tiktok/view/TiktokView"
import NotFoundView from "./notfound/view/NotFoundView";

const App = () => {
   
     return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomeView />}/>
                    <Route path="/todolist" element={<TodolistView />}/>
                    <Route path="/counter" element={<CounterView />}/>
                    <Route path="/tiktok" element={<TitTokView />}/>
                    <Route path="*" element={<NotFoundView />}/>
                </Routes>
            </div>
        </Router>
     )
}

export default App;

