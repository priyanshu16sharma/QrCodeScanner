import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import History from './Pages/History';
import SignInSide from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import MyProvider from './Component/Context/MyProvider';

function App() {
  return (
    <MyProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/logIn" element={<SignInSide />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </MyProvider>
  );
}

export default App;
