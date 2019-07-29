import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const res = await axios.get('/api/groups');
      console.log(res)
      setGroups(res.data);
    }
    getGroups();
  }, [])

  console.log(groups)

  return (
    <div className="container mx-auto mt-10 flex-col flex-1">
      <h1 className="text-white text-6xl text-center font-thin mb-10">Dashboard</h1>
      <div className="w-full max-w-xs md:max-w-4xl rounded bg-white shadow-md mx-auto flex">
        <div className="w-1/4 border-teal-500 border-r-4 flex-col">
          <ul>
            {
              groups.map(group => (
                <li key={group._id} className="p-4 w-full">
                  <p>{group.name}</p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;