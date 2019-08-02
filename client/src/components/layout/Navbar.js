import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import { logoutUser } from "../../actions/authActions";
import EditUserModal from "../dashboard/EditUserModal";
import DelUserModal from '../dashboard/DelUserModal';

function Navbar({ auth, logoutUser }) {
  const [state, setState] = useState({
    settingsModalShowing: false,
    deleteUserModalShowing: false,
    navTrayShowing: false
  });

  function closeSettingsModalHandler() {
    setState({ ...state, settingsModalShowing: false });
  }

  function closeDeleteUserModalHandler() {
    setState({ ...state, deleteUserModalShowing: false });
  }

  const guestLinks = (
    <div className="w-full block flex-grow md:flex md:items-center md:w-auto md:justify-end">
      <div>
        <Link
          to="/login"
          className="hidden md:inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
        >
          Login
        </Link>
      </div>
      <div>
        <Link
          to="/register"
          className="hidden md:inline-block text-sm px-4 mx-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
        >
          Register
        </Link>
      </div>
    </div>
  );

  const authLinks = (
    <div className="w-full block flex-grow md:flex md:items-center md:w-auto md:justify-end">
      <div>
        <button
          className="hidden md:inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          onClick={() => setState({ ...state, settingsModalShowing: true})}
        >
          Settings
        </button>
      </div>
      <div>
        <button
          className="hidden md:inline-block text-sm px-4 mx-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          onClick={logoutUser}
        >
          Logout
        </button>
      </div>
    </div>
  );

  const trayGuestLinks = (
    <div className="w-full block flex-grow flex justify-center items-center w-auto">
      <div>
        <Link
          to="/login"
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-teal-800 border-teal-800 hover:text-teal-500 hover:bg-white"
          onClick={() => setState({ ...state, navTrayShowing: false})}
          >
          Login
        </Link>
      </div>
      <div>
        <Link
          to="/register"
          className="inline-block text-sm px-4 mx-4 py-2 leading-none border rounded text-teal-800 border-teal-800 hover:text-teal-500 hover:bg-white"
          onClick={() => setState({ ...state, navTrayShowing: false})}
        >
          Register
        </Link>
      </div>
    </div>
  );

  const trayAuthLinks = (
    <div className="w-full block flex-grow flex justify-center items-center w-auto">
      <div>
        <button
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-teal-800 border-teal-800 hover:text-teal-500 hover:bg-white"
          onClick={() => setState({ ...state, settingsModalShowing: true, navTrayShowing: false  })}
        >
          Settings
        </button>
      </div>
      <div>
        <button
          className="inline-block text-sm px-4 mx-4 py-2 leading-none border rounded text-teal-800 border-teal-800 hover:text-teal-500 hover:bg-white"
          onClick={() => {
            setState({ ...state, navTrayShowing: false});
            logoutUser();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );

  const navTray = (
    <div className="md:hidden flex justify-center items-center w-full h-auto pb-3 pt-3 border rounded text-teal-800 bg-white">
        {auth.isAuthenticated ? trayAuthLinks : trayGuestLinks}
    </div>
  )

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-teal-800 p-4 border-transparent shadow-md">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to={auth.isAuthenticated ? "/dashboard" : "/"}>
            <span className="font-semibold text-xl tracking-light">
              <span className="pr-2">
                <FontAwesomeIcon icon={faLock} />
              </span>{" "}
              KeySafe
            </span>
          </Link>
        </div>
        <div className="block md:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-400 hover:text-white hover:border-white" onClick={() => setState({...state, navTrayShowing: !state.navTrayShowing})}>
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        {auth.isAuthenticated ? authLinks : guestLinks}
      </nav>
      {state.navTrayShowing && navTray}
      <EditUserModal
        show={state.settingsModalShowing}
        close={closeSettingsModalHandler}
        state={state}
        setState={setState}
      />
      <DelUserModal
        show={state.deleteUserModalShowing}
        close={closeDeleteUserModalHandler}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
