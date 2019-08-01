import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ls from "local-storage";
import { encrypt, decrypt } from "../../util/crypto";

const KeySchema = Yup.object().shape({
  title: Yup.string()
    .max(64, "Title can't be more than 64 characters")
    .required("Title is required"),
  url: Yup.string().max(64, "Group name can't be more than 64 characters"),
  username: Yup.string().max(64, "Username can't be more than 64 characters"),
  password: Yup.string()
    .max(64, "Password can't be more than 64 characters")
    .required("Password is required")
});

function KeyModal(props) {
  const [seePwd, setSeePwd] = useState(false);

  return (
    <div
      className="bg-overlay absolute inset-0 w-full h-screen flex items-center justify-center"
      style={{
        transform: props.show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      <div className="bg-white rounded shadow-md w-1/3">
        <div className="text-center">
          <h3 className="text-black m-0 p-5 text-2xl">{props.action} Key</h3>
        </div>
        <div className="text-center pt-2 pb-4">
          <Formik
            enableReinitialize
            initialValues={{
              title: props.keyToEdit ? props.keyToEdit.title : "",
              url: props.keyToEdit ? props.keyToEdit.url : "",
              username: props.keyToEdit ? props.keyToEdit.username : "",
              password: props.keyToEdit ? props.keyToEdit.password : ""
            }}
            validationSchema={KeySchema}
            onSubmit={async (values, { setSubmitting }) => {
              // encrypt key data for storing in db
              const edKey = ls.get("edKey");
              const keyData = {
                title: encrypt(values.title, edKey),
                url: encrypt(values.url, edKey),
                username: encrypt(values.username, edKey),
                password: encrypt(values.password, edKey)
              };

              let res;

              try {
                if (props.action == "Add") {
                  res = await axios.post(
                    `/api/groups/key/${props.groupId}`,
                    keyData
                  );
                } else if (props.action == "Edit") {
                  res = await axios.put(
                    `/api/groups/key/${props.groupId}/${props.keyToEdit._id}`,
                    keyData
                  );
                }
              } catch (err) {
                console.log(err);
              }

              // decrypt key data to update client
              res.data.keys.forEach(key => {
                key.title = decrypt(key.title, edKey);
                key.url = decrypt(key.url, edKey);
                key.username = decrypt(key.username, edKey);
                key.password = decrypt(key.password, edKey);
              });

              // reset form fields
              for (let key of Object.keys(values)) {
                values[key] = "";
              }

              // update the groups object so items can be immediately edited and deleted if need be
              const groupToUpdate = props.groups.filter(group => group._id == props.groupId)[0];

              groupToUpdate.keys = res.data.keys;
              props.setGroups(props.groups);

              props.setKeys(res.data.keys);
              props.close();
              setSeePwd(false);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="border-b border-b-2 border-teal-500 py-2 w-1/2 mx-auto text-left">
                  <Field
                    className="appearance-none bg-transparent border-none text-gray-700 py-2 px-3 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Title (e.g. site name)"
                    aria-label="Key Title"
                    name="title"
                  />
                </div>
                {errors.title && touched.title ? (
                  <div className="pt-2">{errors.title}</div>
                ) : null}
                <div className="border-b border-b-2 border-teal-500 py-2 w-1/2 mx-auto text-left">
                  <Field
                    className="appearance-none bg-transparent border-none text-gray-700 py-2 px-3 leading-tight focus:outline-none"
                    type="text"
                    placeholder="URL"
                    aria-label="url"
                    name="url"
                  />
                </div>
                {errors.url && touched.url ? (
                  <div className="pt-2">{errors.url}</div>
                ) : null}
                <div className="border-b border-b-2 border-teal-500 py-2 w-1/2 mx-auto text-left">
                  <Field
                    className="appearance-none bg-transparent border-none text-gray-700 py-2 px-3 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Username"
                    aria-label="username"
                    name="username"
                  />
                </div>
                {errors.username && touched.username ? (
                  <div className="pt-2">{errors.username}</div>
                ) : null}
                <div className="border-b border-b-2 border-teal-500 py-2 w-1/2 mx-auto text-left">
                  <Field
                    className="appearance-none bg-transparent border-none text-gray-700 py-2 px-3 leading-tight focus:outline-none"
                    type={seePwd ? "text" : "password"}
                    placeholder="Password"
                    aria-label="password"
                    name="password"
                  />
                </div>
                {!seePwd && (
                  <button className="mt-2" onClick={() => setSeePwd(true)}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                )}
                {seePwd && (
                  <button className="mt-2" onClick={() => setSeePwd(false)}>
                    <FontAwesomeIcon icon={faEyeSlash} />
                  </button>
                )}
                {errors.password && touched.password ? (
                  <div className="pt-2">{errors.password}</div>
                ) : null}
                <div className="bg-blue px-4 pt-8 text-center">
                  <button
                    className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/4 mr-4"
                    onClick={() => {
                      props.close();
                      setSeePwd(false);
                    }}
                    type="button"
                  >
                    Cancel
                  </button>

                  <button
                    className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/4"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default KeyModal;
