import { HashRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ReferralDetails from "./pages/ReferralDetails/ReferralDetails";
import NotFound from "./pages/NotFound/NotFound";


function App() {
  return (
    <HashRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route 
          path="/dashboard" 
          element={<Dashboard />} 
        />

        <Route
          path="/referral/:id"
          element={<ReferralDetails />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </HashRouter>
  );
}

export default App;