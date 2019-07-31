import React from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';

const KeySchema = Yup.object().shape({
  title: Yup.string()
    .max(64, "Title can't be more than 64 characters")
    .required("Title is required"),
  url: Yup.string()
    .max(64, "Group name can't be more than 64 characters"),
  username: Yup.string()
    .max(64, "Username can't be more than 64 characters"),
  password: Yup.string()
    .max(64, "Password can't be more than 64 characters")
    .required("Password is required")
})

function KeyModal(props) {
  return (
    <div 
      className="bg-overlay absolute inset-0 w-full h-screen flex items-center justify-center"
      style={{
        transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}>
      <div className="bg-white rounded shadow-md w-1/3">
        <div className="text-center">
          <h3 className="text-black m-0 p-5 text-2xl">{props.action} Key</h3>
        </div>
          <div className="text-center pt-2 pb-4">
          <Formik 
            initialValues={
              { 
                title: props.action == 'Edit' ? props.key.title : '', 
                url: props.action == 'Edit' ? props.key.url : '', 
                username: props.action == 'Edit' ? props.key.username : '', 
                password: props.action == 'Edit' ? props.key.password : ''
              }
            }
            validationSchema={KeySchema}
            onSubmit={ async values => {
              // await axios.put(`api/groups/${props.groupId}`, { name: value.groupName })
              
              // const indexToUpdate = props.groups.map(group => group._id.toString()).indexOf(props.groupId);

              // let updatedGroups = props.groups;
              // updatedGroups[indexToUpdate].name = value.groupName;
              // props.setGroups(updatedGroups);
              
              console.log(values)
              props.close();
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="border-b border-b-2 border-teal-500 py-2 w-1/2 mx-auto text-left">
                  <Field className="appearance-none bg-transparent border-none text-gray-700 py-2 px-3 leading-tight focus:outline-none" type="text" placeholder="Title (e.g. site name)" aria-label="Key Title" name="title" />
                </div>
                {errors.title && touched.title ? (
                  <div className="pt-2">{errors.title}</div>
                ) : null}
                <div className="border-b border-b-2 border-teal-500 py-2 w-1/2 mx-auto text-left">
                  <Field className="appearance-none bg-transparent border-none text-gray-700 py-2 px-3 leading-tight focus:outline-none" type="text" placeholder="URL" aria-label="url" name="url" />
                </div>
                {errors.url && touched.url ? (
                  <div className="pt-2">{errors.url}</div>
                ) : null}
                <div className="border-b border-b-2 border-teal-500 py-2 w-1/2 mx-auto text-left">
                  <Field className="appearance-none bg-transparent border-none text-gray-700 py-2 px-3 leading-tight focus:outline-none" type="text" placeholder="Username" aria-label="username" name="username" />
                </div>
                {errors.username && touched.username ? (
                  <div className="pt-2">{errors.username}</div>
                ) : null}   
                <div className="border-b border-b-2 border-teal-500 py-2 w-1/2 mx-auto text-left">
                  <Field className="appearance-none bg-transparent border-none text-gray-700 py-2 px-3 leading-tight focus:outline-none" type="password" placeholder="Password" aria-label="password" name="password" />
                </div>
                {errors.password && touched.password ? (
                  <div className="pt-2">{errors.password}</div>
                ) : null}                              
                <div className="bg-blue px-4 pt-8 text-center">
                  <button className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/4 mr-4" onClick={props.close}>Cancel</button>
                  <button className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/4" type="submit">Save</button>
                </div>                
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default KeyModal;