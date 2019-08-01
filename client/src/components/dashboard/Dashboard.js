import React from 'react';

import Table from './Table';

function Dashboard() {
  return (
    <div className="container mx-auto mt-10 flex-col flex-1">
      <h1 className="text-white text-5xl text-center font-thin mb-2">Hi there!</h1>
      <p className="text-white text-lg text-center mb-6">Create a new group or add some keys to an existing one!</p>
      <div>
        <Table />
      </div>
    </div>
  )
}

export default Dashboard;