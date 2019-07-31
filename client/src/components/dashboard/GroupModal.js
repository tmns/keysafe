import React from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const GroupNameSchema = Yup.object().shape({
  groupName: Yup.string()
    .min(2, "Group name must be at least 2 characters")
    .max(32, "Group name can't be more than 32 characters")
    .required('Group name is required')
})

function GroupModal(props) {
  return (
    <div 
      className="bg-overlay absolute inset-0 w-full h-screen flex items-center justify-center"
      style={{
        transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
    }}>
      <div className="bg-white rounded shadow-md h-64 w-1/3">
        <div className="text-center">
          <h3 className="text-black m-0 p-5 text-2xl">Edit Group Name</h3>
        </div>
          <div className="text-center pt-2">
          <Formik 
            initialValues={{ groupName: '' }}
            validationSchema={GroupNameSchema}
            onSubmit={ async value => {
              console.log(value);
              console.log(props.groupId)
              // const res = await axios.put(`api/groups/${props.groupId}`, { name: value.name })
              const updatedGroups = props.groups.slice(props.groups.map(group => group._id.toString()).indexOf(props.groupId));
              console.log(updatedGroups);
              props.close();
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="border-b border-b-2 border-teal-500 py-2 w-1/2 mx-auto text-left">
                  <Field className="appearance-none bg-transparent border-none text-gray-700 py-2 px-3 leading-tight focus:outline-none" type="text" placeholder="Group Name" aria-label="Group Name" name="groupName" />
                </div>
                {errors.groupName && touched.groupName ? (
                  <div className="pt-2">{errors.groupName}</div>
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

export default GroupModal;