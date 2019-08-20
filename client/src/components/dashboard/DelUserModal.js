import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { logoutUser } from "../../actions/authActions";

const DeleteUserSchema = Yup.object().shape({
  password: Yup.string().required("Password is required for account deletion")
});

function DelUserModal(props) {
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
          <h3 className="text-red-600 text-bold m-0 p-5 text-2xl">
            Delete Account
          </h3>
        </div>
        <div className="text-center text-red-600 text-bold pt-2 px-5">
          Are you sure you want to delete your account?
          <br /> All your data will be permanently removed!
        </div>
        <div className="text-center pt-2">
          <Formik
            initialValues={{ password: "" }}
            validationSchema={DeleteUserSchema}
            onSubmit={async value => {
              console.log(value);
              try {
                await axios.post("/api/users/authCheck", value);
                await axios.delete("/api/users");
                props.logoutUser();
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
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                    name="password"
                  />
                </div>
                {errors.password && touched.password ? (
                  <div className="pt-2">{errors.password}</div>
                ) : null}
                <div className="bg-blue px-4 pt-8 text-center mb-6">
                  <button
                    className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/3 md:w-1/4 mr-4"
                    onClick={props.close}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/3 md:w-1/4"
                    type="submit"
                  >
                    Delete
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

export default connect(
  null,
  { logoutUser }
)(DelUserModal);
