import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-teal-700">
        <Navbar />
        <Route exact path='/' component={Landing} />
      </div>
    </BrowserRouter>
  );
}

export default App;
