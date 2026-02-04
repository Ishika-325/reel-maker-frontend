import React from 'react'
import './index.css'
import Home from './components/Home.jsx'
import Landing from './components/Landing.jsx'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import ProtectedRoute from "./components/ProtectedRoute";
import CreateNewReel from "./components/CreateNewReel.jsx";
import ReelResult from './components/ReelResult.jsx';
import Reels from './components/Reels.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-reel"
          element={
            <ProtectedRoute>
              <CreateNewReel />
            </ProtectedRoute>
          }
        />
         <Route
          path="/reels/:id"
          element={
            <ProtectedRoute>
              <ReelResult />
            </ProtectedRoute>
          }
        />
         <Route
          path="/reels"
          element={
            <ProtectedRoute>
              <Reels />
            </ProtectedRoute>
          }
        />
    </Routes>
  )
}

export default App
