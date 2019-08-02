import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UpdateUserSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Your username must be at least 2 characters")
    .max(32, "Your username can't be more than 32 characters"),
  currentPassword: Yup.string()
    .required("Your current password is required")
});

function EditUserModal(props) {
  return (
    <div
      className="bg-transparent md:bg-overlay absolute inset-0 w-full h-screen flex items-center justify-center"
      style={{
        transform: props.show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      <div className="bg-white rounded shadow-md mx-2 md:mx-0 w-full md:w-1/3">
        <div className="text-center">
          <h3 className="text-black m-0 p-5 text-2xl">User Settings</h3>
        </div>
        <div className="text-center pt-2 pb-4">
          <Formik
            enableReinitialize
            initialValues={{
              username: "",
              currentPassword: ""
            }}
            validationSchema={UpdateUserSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await axios.put("/api/users", values);
                props.close();
              } catch (err) {
                console.log(err);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="border-b border-b-2 border-teal-500 py-2 w-1/2 mx-auto text-left">
                  <Field
                    className="appearance-none bg-transparent border-none text-gray-700 py-2 px-3 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Username"
                    aria-label="Username"
                    name="username"
                  />
                </div>
                {errors.username && touched.username ? (
                  <div className="pt-2">{errors.username}</div>
                ) : null}
                <div className="border-b border-b-2 border-teal-500 py-2 w-1/2 mx-auto text-left">
                  <Field
                    className="appearance-none bg-transparent border-none text-gray-700 py-2 px-3 leading-tight focus:outline-none"
                    type="password"
                    placeholder="Current Password"
                    aria-label="Current Password"
                    name="currentPassword"
                  />
                </div>
                {errors.currentPassword && touched.currentPassword ? (
                  <div className="pt-2">{errors.currentPassword}</div>
                ) : null}
                <div className="bg-blue px-4 pt-8 text-center">
                  <button
                    className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/4 mr-4"
                    onClick={() => {
                      props.close();
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
          <button
            className="mt-6 text-right text-red-600 font-bold"
            onClick={() => {
              props.setState({
                settingsModalShowing: false,
                deleteUserModalShowing: true
              });
            }}
          >
            Do you wish to delete your account?
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;
