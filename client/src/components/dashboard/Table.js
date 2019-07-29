import React, { useState, useEffect } from "react";
import axios from "axios";

function Table() {
  const [groups, setGroups] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const res = await axios.get("/api/groups");

      setGroups(res.data);
    };
    getGroups();
  }, []);

  async function handleGroupClick(e) {
    const groupId = e.target.value;

    const selectedGroup = groups.filter(group => group._id == groupId)[0];

    setKeys(selectedGroup.keys);
  }

  return (
    <div className="w-full max-w-xs md:max-w-4xl bg-teal-700 mx-auto flex">
      <div className="w-1/4 flex-col bg-white mr-4 rounded shadow-md">
        <h2 className="text-center pt-5 pb-3 border-b">Groups</h2>
        <ul>
          {groups.map(group => (
            <li key={group._id} className="p-4 w-full border-b">
              <button value={group._id} onClick={handleGroupClick}>
                {group.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 flex-col bg-white rounded shadow-md">
        <div className="flex justify-around pt-5 pb-3 border-b">
            <p>Title</p>
            <p>Username</p>
            <p>URL</p>
        </div>
        {keys.map(key => (
          <div key={key._id} className="flex justify-around pt-5 pb-3 border-b cursor-pointer">
            <p>{key.title}</p>
            <p>{key.username}</p>
            <p>{key.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
