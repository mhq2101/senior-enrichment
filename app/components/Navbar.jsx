import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


export default class Navbar extends Component {

  render () {

    return (
      <nav>
        <h1>Yo dis the app doe</h1>
      </nav>
    );
  }
}

// const mapStateToProps = function (state) {
//   return {
//     campuses: state.campuses,
//   };
// }

// const NavbarContainer = withRouter(connect(mapStateToProps)(Navbar));
// export default NavbarContainer;