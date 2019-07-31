import React from "react";
import axios from "axios";

function DelGroupMomdal(props) {
  return (
    <div
      className="bg-overlay absolute inset-0 w-full h-screen flex items-center justify-center"
      style={{
        transform: props.show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      <div className="bg-white rounded shadow-md h-64 w-1/3">
        <div className="text-center">
          <h3 className="text-red-600 text-bold m-0 p-5 text-2xl">Confirm Delete</h3>
        </div>
        <div className="text-center text-red-600 text-bold pt-2">
          Are you sure you want to delete this group? All its passwords will be permanently removed!
          <div className="bg-blue px-4 pt-8 text-center">
            <button
              className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/4 mr-4"
              onClick={props.close}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/4"
              onClick={async () => {
                try {
                  await axios.delete(`/api/groups/${props.groupId}`);

                  const updatedGroups = props.groups.filter(group => group._id != props.groupId);

                  props.setGroups(updatedGroups);
                } catch(err) {
                  console.log(err);
                }
                props.close();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DelGroupMomdal;
