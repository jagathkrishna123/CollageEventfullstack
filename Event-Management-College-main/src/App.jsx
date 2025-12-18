import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Display } from "./Display/display";
import ProgramDetails from "./Display/ProgramDetails/ProgramDetails";
import FooterContents from "./Display/Footer/FooterContents";
import { NavBar } from "./Display/NavBar/navBar";
import Login from "./Display/Loign/Login";
import Layout from "./pages/teacher/Layout";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddEvent from "./pages/teacher/AddEvent";
import Feedback from "./pages/teacher/Feedback";
import Registrations from "./pages/teacher/Registrations";
import Attendence from "./pages/teacher/Attendence";
import AdminLayout from "./pages/admin/Layout";
import AdminAddEvent from "./pages/admin/AddEvent";
import AdminFeedback from "./pages/admin/Feedback";
import AdminRegistrations from "./pages/admin/Registrations";
import AdminAttendence from "./pages/admin/Attendence";
import AddProgram from "./pages/admin/AddProgram";
import TeacherAddProgram from "./pages/teacher/TeacherAddProgram";
import EventDeatils from "./Display/EventDetails/EventDeatils";

function App() {
  const {pathname} = useLocation()
  const hideLayout = pathname.includes("admin") || pathname.includes("teacher")|| pathname.includes("login");
  return (
    <div className="bg-gradient-to-br from-neutral-900 via-gray-900 to-black
">
      
      <div className="w-full">
        {!hideLayout && <NavBar />}
      </div>
        <Routes>
          <Route path="/" element={<Display />} />
          <Route path="/programdetails/:id" element={<ProgramDetails />} />
          <Route path="/eventdetails/:id" element={<EventDeatils/>} />
          <Route path="/login" element={<Login/>} />
          <Route path='/teacher' element={true ? <Layout/> : <Login/>}>
            <Route index element={<TeacherDashboard/>}/>
            <Route path='teacher-add-program' element={<TeacherAddProgram/>}/>
            <Route path='addevent' element={<AddEvent/>}/>
            <Route path='feedback' element={<Feedback/>}/>
            <Route path='registrations' element={<Registrations/>}/>
            <Route path='attendence' element={<Attendence/>}/>
        </Route>
          <Route path='/admin' element={true ? <AdminLayout/> : <Login/>}>
            <Route index element={<AdminDashboard/>}/>
            <Route path='admin-add-program' element={<AddProgram/>}/>
            <Route path='addevent' element={<AdminAddEvent/>}/>
            <Route path='feedback' element={<AdminFeedback/>}/>
            <Route path='registrations' element={<AdminRegistrations/>}/>
            <Route path='attendence' element={<AdminAttendence/>}/>
         </Route>
        </Routes>
        {!hideLayout && <FooterContents />}
      
    </div>
  );
}
export default App;
