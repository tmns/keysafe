import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Your username must be at least 2 characters")
    .max(32, "Your username can't be more than 32 characters")
    .required("A username is required"),
  password: Yup.string()
    .min(2, "Your password must be at least 8 characters")
    .max(64, "Your password can't be more than 64 characters")
    .required("A password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("You must confirm your password")
});

function Register() {
  return (
    <div className="w-full max-w-xs flex-auto mx-auto">
      <h1 className="text-white text-center text-5xl font-thin py-10">Sign Up</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={RegisterSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values);
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
            </div>
            <div className="mb-4">
              <label className="block text-teal-800 text-sm font-bold mb-2">
                Password *
              </label>
              <Field className="shadow appearance-none border border-teal-600 rounded w-full py-2 px-3 text-teal-600 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>
            <div className="mb-6">
            <label className="block text-teal-800 text-sm font-bold mb-2">
                Confirm Password *
              </label>
              <Field className="shadow appearance-none border border-teal-600 rounded w-full py-2 px-3 text-teal-600 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="confirmPassword" type="password" />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div>{errors.confirmPassword}</div>
              ) : null}
            </div>
            <button className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
