import React, { Fragment, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faTimes,
  faPen,
  faCopy
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ls from 'local-storage';
import CopyToClipboard from 'react-copy-to-clipboard';

import EditGroupModal from "./EditGroupModal";
import DelGroupModal from "./DelGroupModal";
import KeyModal from "./KeyModal";
import DelKeyModal from './DelKeyModal';
import { encrypt, decrypt } from '../../util/crypto';

const GroupNameSchema = Yup.object().shape({
  groupName: Yup.string()
    .min(2, "Group name must be at least 2 characters")
    .max(32, "Group name can't be more than 32 characters")
    .required("Group name is required")
});

function Table() {
  const [groups, setGroups] = useState([]);
  const [keys, setKeys] = useState([]);
  const [state, setState] = useState({
    currentGroupId: null,
    currentKeyId: null,
    currentKey: null,
    addingGroup: false,
    addingKey: false,
    editGroupModalShowing: false,
    delGroupModalShowing: false,
    keyModalShowing: false,
    delKeyModalShowing: false,
    keyAction: null
  });

  useEffect(() => {
    const getGroups = async () => {
      const res = await axios.get("/api/groups");
      const edKey = ls.get('edKey');
      
      // if groups exist, decrypt their names and keys
      if (res.data.length != 0) {
        res.data.forEach(group => {
          group.name = decrypt(group.name, edKey);
          group.keys.forEach(key => {
            key.title = decrypt(key.title, edKey);
            key.url = decrypt(key.url, edKey);
            key.username = decrypt(key.username, edKey);
            key.password = decrypt(key.password, edKey);
          })
        })
      } 

      setGroups(res.data);
    };
    getGroups();
  }, []);

  async function handleGroupClick(e) {
    const groupId = e.target.value;
    
    setState({ ...state, currentGroupId: groupId })

    const selectedGroup = groups.filter(group => group._id == groupId)[0];

    setKeys(selectedGroup.keys);
  }

  function handleAddGroupClick() {
    setState({ ...state, addingGroup: true });
  }

  function closeEditGroupModalHandler() {
    setState({ ...state, editGroupModalShowing: false });
  }

  function closeDelGroupModalHandler() {
    setState({ ...state, delGroupModalShowing: false });
  }

  function closeKeyModalHandler() {
    setState({ ...state, keyModalShowing: false });
  }

  function closeDelKeyModalHandler() {
    setState({ ...state, delKeyModalShowing: false });
  }

  return (
    <Fragment>
      <div className="w-full max-w-xs md:max-w-4xl bg-teal-700 mx-auto flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 flex-col bg-white mr-4 rounded shadow-md overflow-auto mb-4 md:mb-0" style={{maxHeight: '600px'}}>
          <div>
            <h2 className="text-center pt-5 pb-3 border-b">Groups</h2>
          </div>
          <div>
            <ul>
              {groups.map(group => (
                <li
                  key={group._id}
                  className="p-4 w-full border-b hover:bg-teal-700 hover:text-white"
                >
                  <button value={group._id} onClick={handleGroupClick}>
                    {group.name}
                  </button>
                  <button
                    className="float-right"
                    onClick={() =>
                      setState({
                        ...state,
                        delGroupModalShowing: true,
                        currentGroupId: group._id
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />{" "}
                  </button>
                  <button className="mr-5 float-right">
                    <FontAwesomeIcon
                      icon={faPen}
                      onClick={() =>
                        setState({
                          ...state,
                          editGroupModalShowing: true,
                          currentGroupId: group._id
                        })
                      }
                    />{" "}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {state.addingGroup && (
            <Formik
              initialValues={{ groupName: "" }}
              validationSchema={GroupNameSchema}
              onSubmit={async value => {
                // encrypt group name to store in db
                const edKey = ls.get('edKey');
                const encGroupName = encrypt(value.groupName, edKey);

                const res = await axios.post("/api/groups", {
                  name: encGroupName
                });

                // decrypt group name to update client
                res.data.name = decrypt(res.data.name, edKey);

                setGroups([...groups, res.data]);
                setState({ ...state, addingGroup: false });
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="border-b border-b-2 border-teal-500 py-2">
                    <Field
                      className="appearance-none bg-transparent border-none w-1/2 text-gray-700 mx-3 py-2 leading-tight focus:outline-none"
                      type="text"
                      placeholder="Group Name"
                      aria-label="Group Name"
                      name="groupName"
                    />
                    <button className="ml-6" type="submit">
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                      type="button"
                      className="ml-5"
                      onClick={() => setState({ ...state, addingGroup: false })}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    {errors.groupName && touched.groupName ? (
                      <div className="pl-5 py-2">{errors.groupName}</div>
                    ) : null}
                  </div>
                </Form>
              )}
            </Formik>
          )}
          <div className="p-4 w-full border-b text-center">
            <button onClick={handleAddGroupClick}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className="w-full md:w-3/4 flex-col bg-white rounded shadow-md overflow-auto" style={{maxHeight: '600px'}}>
          <div className="flex pt-5 pb-3 border-b">
            <div className="w-1/3 text-center">
              <span className="">Title</span>
            </div>
            <div className="w-1/3 text-center">
              <span className="">Username</span>
            </div>
            <div className="w-1/3 text-center">
              <span className="">Actions</span>
            </div>
          </div>
          <div>
            <ul>
              {keys.map(key => (
                <li
                  key={key._id}
                  className="flex pt-5 pb-3 border-b hover:bg-teal-700 hover:text-white text-center"
                >
                  <div className="w-1/3 text-center overflow-auto">
                    <span className="">{key.title}</span>
                  </div>
                  <div className="w-1/3 text-center overflow-auto">
                    <span className="">{key.username}</span>
                  </div>
                  <div className="w-1/3 text-center overflow-auto">
                    <CopyToClipboard text={key.password}>
                      <button>
                        <FontAwesomeIcon icon={faCopy} />{" "}
                      </button>
                    </CopyToClipboard>
                    <button className="ml-6 md:ml-12">
                      <FontAwesomeIcon
                        icon={faPen}
                        onClick={() =>
                          setState({
                            ...state,
                            keyModalShowing: true,
                            keyAction: 'Edit',
                            currentKey: key
                          })
                        }
                      />{" "}
                    </button>
                    <button
                      className="ml-6 md:ml-12"
                      onClick={() => setState(
                        {
                          ...state,
                          delKeyModalShowing: true,
                          currentKeyId: key._id
                        }
                      )}
                    >
                      <FontAwesomeIcon icon={faTimes} />{" "}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {state.currentGroupId && <div className="p-4 w-full border-b text-center">
            <button 
              onClick={() =>
                setState({
                  ...state,
                  keyModalShowing: true,
                  keyAction: 'Add',
                  currentKey: null
                })
              }
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>}
        </div>
      </div>
      <EditGroupModal
        show={state.editGroupModalShowing}
        close={closeEditGroupModalHandler}
        groupId={state.currentGroupId}
        groups={groups}
        setGroups={setGroups}
      />
      <DelGroupModal
        show={state.delGroupModalShowing}
        close={closeDelGroupModalHandler}
        groupId={state.currentGroupId}
        groups={groups}
        setGroups={setGroups}
      />
      <KeyModal
        action={state.keyAction}
        show={state.keyModalShowing}
        close={closeKeyModalHandler}
        groupId={state.currentGroupId}
        groups={groups}
        setGroups={setGroups}
        keyToEdit={state.currentKey}
        keys={keys}
        setKeys={setKeys}
      />
      <DelKeyModal
        show={state.delKeyModalShowing}
        close={closeDelKeyModalHandler}
        groupId={state.currentGroupId}
        keyId={state.currentKeyId}
        keys={keys}
        setKeys={setKeys}
      />
    </Fragment>
  );
}

export default Table;
