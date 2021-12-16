import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AppHeader } from "./cmps/AppHeader";
import BoardApp from "./views/BoardApp";
import { HomePage } from "./views/HomePage";

export function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <Routes>
          <Route path='/'  element={<HomePage/>} >
          </Route>
          <Route path='board'  element={<BoardApp/>} >
          </Route>
        </Routes>

        {/* <AppFooter /> */}
      </div>
    </Router>
  );
}
