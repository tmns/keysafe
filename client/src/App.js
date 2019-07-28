import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AuthRoute from './components/common/AuthRoute';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-teal-700 flex flex-col">
        <Navbar />
        <Route exact path='/' component={Landing} />
        <AuthRoute exact path='/register' component={Register} />
        <AuthRoute exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
