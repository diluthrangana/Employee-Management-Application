import { Route,Routes } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard'
import PostUser from './components/employee/PostUser'
import UpdateUser from './components/employee/UpdateUser'
import Header from './components/header/Header'


function App() {
  return (
   <>
   <Header/>
   <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/employee" element={<PostUser />} />
    <Route path="/employee/:id" element={<UpdateUser />} />
   </Routes>
   </>
  );
}

export default App;
