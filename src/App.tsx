import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AppNav } from "./cmps/AppNav";
import Workspace from "./views/Workspace";
import { HomePage } from "./views/HomePage";

export function App() {
  return (
    <Router>
      <div className="app flex">
        <AppNav />
        <Routes>
          <Route path='/'  element={<HomePage/>} >
          </Route>
          <Route path='board'  element={<Workspace/>} >
            <Route path=":boardId" element={<Workspace />} />
            <Route path="" element={<Workspace />} />
          </Route>
        </Routes>

        {/* <AppFooter /> */}
      </div>
    </Router>
  );
}
