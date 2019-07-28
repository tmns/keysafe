import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-teal-700 flex flex-col">
        <Navbar />
        <Route exact path='/' component={Landing} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
