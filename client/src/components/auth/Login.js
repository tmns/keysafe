import React from "react";
import { connect } from 'react-redux';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { loginUser } from '../../actions/authActions';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .required("A username is required"),
  password: Yup.string()
    .required("A password is required"),
});

function Login({ history, loginUser, errorsFromServer }) {
  return (
    <div className="w-full max-w-xs flex-auto mx-auto">
      <h1 className="text-white text-center text-5xl font-thin py-10">Login</h1>
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        validationSchema={RegisterSchema}
        onSubmit={values => {
          
          const userData = {
            username: values.username,
            password: values.password
          }

          loginUser(userData, history);
        }}
      >
        {({ errors, touched }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
            <label className="block text-teal-800 text-sm font-bold mb-2">
                Username
              </label>
              <Field className="shadow appearance-none border border-teal-600 rounded w-full py-2 px-3 text-teal-600 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="username" />
              {errors.username && touched.username ? (
                <div>{errors.username}</div>
              ) : null}
              {errorsFromServer.username && <div>{errorsFromServer.username}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-teal-800 text-sm font-bold mb-2">
                Password
              </label>
              <Field className="shadow appearance-none border border-teal-600 rounded w-full py-2 px-3 text-teal-600 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              {errorsFromServer.password && <div>{errorsFromServer.password}</div>}
            </div>
            <button className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const mapStateToProps = state => ({
  errorsFromServer: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);