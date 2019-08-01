import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { SwapSpinner } from "react-spinners-kit";

import { loginUser, clearErrors } from "../../actions/authActions";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("A username is required"),
  password: Yup.string().required("A password is required")
});

function Login({ history, loginUser, clearErrors, errorsFromServer }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full max-w-xs flex-auto mx-auto">
      <h1 className="text-white text-center text-5xl font-thin py-10">Login</h1>
      {loading && Object.keys(errorsFromServer).length == 0 && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center text-teal-800 text-md font-bd flex flex-col justify-center items-center">
          <p className="mb-4">Generating security key and decrypting your data...</p>
          <SwapSpinner color="#198c8c" />
        </div>
      )}
      {(!loading || Object.keys(errorsFromServer).length > 0) && (
        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          validationSchema={LoginSchema}
          onSubmit={values => {
            const userData = {
              username: values.username,
              password: values.password
            };
            clearErrors();
            loginUser(userData, history);
            setLoading(true);
          }}
        >
          {({ errors, touched }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-teal-800 text-sm font-bold mb-2">
                  Username
                </label>
                <Field
                  className="shadow appearance-none border border-teal-600 rounded w-full py-2 px-3 text-teal-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="username"
                />
                {errors.username && touched.username ? (
                  <div>{errors.username}</div>
                ) : null}
                {errorsFromServer.username && (
                  <div>{errorsFromServer.username}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-teal-800 text-sm font-bold mb-2">
                  Password
                </label>
                <Field
                  className="shadow appearance-none border border-teal-600 rounded w-full py-2 px-3 text-teal-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="password"
                  type="password"
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                {errorsFromServer.password && (
                  <div>{errorsFromServer.password}</div>
                )}
              </div>
              <button
                className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  errorsFromServer: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(Login);
