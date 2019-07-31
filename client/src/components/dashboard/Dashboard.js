import React from 'react';
import { connect } from 'react-redux';

import Table from './Table';

function Dashboard({ username }) {
  return (
    <div className="container mx-auto mt-10 flex-col flex-1">
      <h1 className="text-white text-5xl text-center font-thin mb-2">Welcome, {username}.</h1>
      <p className="text-white text-lg text-center mb-6">Create a new group or add some keys to an existing one!</p>
      <div>
        <Table />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  username: state.auth.user.username
})

export default connect(mapStateToProps)(Dashboard);