import { Route, Routes } from "react-router-dom";
import { nanoid } from 'nanoid';

import AdminDashboard from "./components/Admin/AdminDashboard";
import TicketView from "./components/Admin/AdminTicketView";
import UserLandingPage from "./components/User/UserLandingPage";
import CreateTicketForm from "./components/User/CreateTicketForm";
import UserDashboard from "./components/User/UserDashboard";
import UserTicketView from "./components/User/UserTicketView";
import FirstPage from "./components/FirstPage/First"
import UserChat from "./components/User/UserChat/UserChat";
import AdminChat from "./components/Admin/AdminChat/AdminChat"

function App() {
  const unique_id = nanoid(5);
  return (
    <Routes>
        <Route path="/*" element={<FirstPage />} />
      {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/ticket/:id" element={<TicketView />} />
        <Route path="/admin/chat/:id" element={<AdminChat />} />

      {/* User routes */}
        <Route path="/user/*" element={<UserLandingPage userId={unique_id}/>} />
        <Route path="/user/create" element={<CreateTicketForm userId={unique_id}/>} />
        <Route path="/user/dashboard/*" element={<UserDashboard userId={unique_id}/>} />
        <Route path="/user/ticket/:id" element={<UserTicketView userId={unique_id}/>} />
        <Route path="/user/chat/:id" element={<UserChat />} />
    </Routes>
  );
}

export default App;