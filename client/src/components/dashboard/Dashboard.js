import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from './Table';

function Dashboard() {
  return (
    <div className="container mx-auto mt-10 flex-col flex-1">
      <h1 className="text-white text-6xl text-center font-thin mb-10">Dashboard</h1>
      <div>
        <Table />
      </div>
    </div>
  )
}

export default Dashboard;