import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Register from './pages/Register';

import PublicLessons from './pages/PublicLessons';
import LessonDetails from './pages/LessonDetails';

import AddLesson from './pages/Dashboard/AddLesson';
import MyLessons from './pages/Dashboard/MyLessons';
import EditLesson from './pages/Dashboard/EditLesson';
import Favorites from './pages/Dashboard/Favorites';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Dashboard/Profile';
import Payment from './pages/Payment/Payment';
import Success from './pages/Payment/Success';
import Cancel from './pages/Payment/Cancel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="lessons" element={<PublicLessons />} />
          <Route path="lessons/:id" element={<LessonDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Dashboard Routes */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/profile" element={<Profile />} />
          <Route path="dashboard/add-lesson" element={<AddLesson />} />
          <Route path="dashboard/my-lessons" element={<MyLessons />} />
          <Route path="dashboard/edit-lesson/:id" element={<EditLesson />} />
          <Route path="dashboard/my-favorites" element={<Favorites />} />

          {/* Payment */}
          <Route path="payment" element={<Payment />} />
          <Route path="payment/success" element={<Success />} />
          <Route path="payment/cancel" element={<Cancel />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
