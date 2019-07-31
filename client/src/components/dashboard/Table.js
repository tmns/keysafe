import React, { Fragment, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCheck, faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

import GroupModal from './GroupModal';

const GroupNameSchema = Yup.object().shape({
  groupName: Yup.string()
    .min(2, "Group name must be at least 2 characters")
    .max(32, "Group name can't be more than 32 characters")
    .required('Group name is required')
})

function Table() {
  const [groups, setGroups] = useState([]);
  const [keys, setKeys] = useState([]);
  const [state, setState] = useState({
    addingGroup: false,
    addingKey: false,
    groupModalShowing: false,
    currentGroupId: null
  })

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

  function handleAddGroupClick() {
    setState({ ...state, addingGroup: true });
  }

  function closeGroupModalHandler() {
    setState({ ...state, groupModalShowing: false });
  }

  return (
    <Fragment>
    <div className="w-full max-w-xs md:max-w-4xl bg-teal-700 mx-auto flex">
      <div className="w-1/4 flex-col bg-white mr-4 rounded shadow-md">
        <div>
          <h2 className="text-center pt-5 pb-3 border-b">Groups</h2>
        </div>
        <div>
          <ul>
            {groups.map(group => (
                <li key={group._id} className="p-4 w-full border-b hover:bg-teal-700 hover:text-white">
                  <button value={group._id} onClick={handleGroupClick}>
                    {group.name}
                  </button>
                  <button className="float-right"><FontAwesomeIcon icon={ faTimes } /> </button>
                  <button className="mr-5 float-right"><FontAwesomeIcon icon={ faPen } onClick={() => setState({ ...state, groupModalShowing: true, currentGroupId: group._id })} /> </button>
                </li>
            ))}
          </ul>
        </div>
        {state.addingGroup && (
          <Formik 
            initialValues={{ groupName: '' }}
            validationSchema={GroupNameSchema}
            onSubmit={ async value => {
              const res = await axios.post('/api/groups', { name: value.groupName });
              setGroups([...groups, res.data ])
              setState({ ...state, addingGroup: false });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="border-b border-b-2 border-teal-500 py-2">
                  <Field className="appearance-none bg-transparent border-none w-1/2 text-gray-700 mx-3 py-2 leading-tight focus:outline-none" type="text" placeholder="Group Name" aria-label="Group Name" name="groupName" />
                  <button className="ml-6" type="submit"><FontAwesomeIcon icon={ faCheck } /></button>
                  <button className="ml-5" onClick={() => setState({...state, addingGroup: false})}><FontAwesomeIcon icon={ faTimes } /></button>
                  {errors.groupName && touched.groupName ? (
                  <div className="pl-5 py-2">{errors.groupName}</div> ) : null}
                </div>
              </Form>
            )}
          </Formik>
        )}
        <div className="p-4 w-full border-b text-center">
          <button onClick={handleAddGroupClick}>
            <FontAwesomeIcon icon={ faPlus } />
          </button>
        </div>
      </div>
      <div className="w-3/4 flex-col bg-white rounded shadow-md">
        <div className="flex justify-around pt-5 pb-3 border-b">
            <p>Title</p>
            <p>Username</p>
            <p>URL</p>
        </div>
        <div>
          {keys.map(key => (
            <div key={key._id} className="flex justify-around pt-5 pb-3 border-b cursor-pointer hover:bg-teal-700 hover:text-white">
              <p>{key.title}</p>
              <p>{key.username}</p>
              <p>{key.url}</p>
            </div>
          ))}
        </div>
        <div className="p-4 w-full border-b text-center">
          <button onClick={handleAddGroupClick}>
            <FontAwesomeIcon icon={ faPlus } />
          </button>
        </div>
      </div>
    </div>
    <GroupModal
      show={state.groupModalShowing}
      close={closeGroupModalHandler}
      groupId={state.currentGroupId}
      groups={groups}
      setGroups={setGroups}>
    </GroupModal>
    </Fragment>
  );
}

export default Table;
