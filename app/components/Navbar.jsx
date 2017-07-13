import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
// import history from '../history';

/* -----------------    COMPONENT     ------------------ */

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.renderNewStudentCampus = this.renderNewStudentCampus.bind(this);
  
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target=".navbar-collapse">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="/"><img src="/poot.jpg" /></Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <NavLink to="/students" activeClassName="active">Students</NavLink>
              </li>
              <li>
                <NavLink to="/campuses" activeClassName="active">Campuses</NavLink>
              </li>
            </ul>
            { this.renderNewStudentCampus() }
          </div>
        </div>
      </nav>
    );
  }

  renderNewStudentCampus() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
         <NavLink to="/new-student" activeClassName="active">Create New Student</NavLink>
        </li>
        <li>
          <NavLink to="/new-campus" activeClassName="active">Create New Campus</NavLink>
        </li>
      </ul>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

// const mapProps = null;

// const mapDispatch = dispatch => ({
//   logout: () => {
//     console.log('You signed out. Sorta.');
//     history.push('/');
//   }
// });

// export default withRouter(connect(mapProps, mapDispatch)(Navbar));