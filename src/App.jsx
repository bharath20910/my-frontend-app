import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";


function App() {
  return (
    <BrowserRouter basename="/my-frontend-app">

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<h1>DASHBOARD WORKING</h1>}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;