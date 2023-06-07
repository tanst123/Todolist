import { BrowserRouter as Router,Route, Routes} from "react-router-dom";
import CounterView from "./counter/view/CounterView";
import HomeView from "./home/view/HomeView"
import TodolistView from "./todolist/view/TodolistView";
import TitTokView from "./tiktok/view/TiktokView"
const App = () => {
     return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" Component={HomeView}/>
                    <Route path="/todolist" Component={TodolistView}/>
                    <Route path="/counter" Component={CounterView}/>
                    <Route path="/tiktok" Component={TitTokView}/>
                </Routes>
            </div>
        </Router>
     )
}

export default App;

