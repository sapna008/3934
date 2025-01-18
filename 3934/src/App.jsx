import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { EmployeeView } from './components/EmployeeView';
import { EmployerView } from './components/EmployerView';
import { PrivateRoute } from './components/PrivateRoute';
import ParticlesComponent from './components/particle';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <ParticlesComponent id="particles" className="absolute inset-0 z-0" />
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to={`/dashboard/${user.role}`} /> : <LoginForm onLogin={handleLogin} />}
          />
          <Route
            path="/dashboard/employee"
            element={
              <PrivateRoute user={user} allowedRole="employee">
                <EmployeeView user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/employer"
            element={
              <PrivateRoute user={user} allowedRole="employer">
                <EmployerView user={user} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import React from 'react'
// import MyCombinepages from './components/MyCombinepages';
// function App() {
//   return (
//     <div>
//       <MyCombinepages />
//     </div>
//   )
// }

// export default App
