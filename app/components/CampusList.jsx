import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class CampusList extends Component {

    render() {
        const { campuses, students } = this.props;


        return (
            <div>
            <h2>Campus List</h2>
            <ul>
                {
                    campuses.map(campus => {
                        return (<li key={campus.id}>
                            <NavLink to={`/campuses/${campus.id}`} activeClassName="active">
                                <span>{campus.name}</span>
                                <span className="badge">{' (' + students.filter(student => student.campusId === campus.id).length + ')'}</span>
                            </NavLink>
                            <img src={campus.imgUrl} alt="pootbro" height="60" width="60"/>
                        </li>)
                    })
                }
            </ul>
            <div>
                    <NavLink to="/new-campus">You could like Create a campus if you want homie...</NavLink>
                </div>
            </div>
        )




    }


}

const mapStateToProps = function (state) {
    return {
        campuses: state.campuses,
        students: state.students
    };
}

const CampusListContainer = withRouter(connect(mapStateToProps)(CampusList));
export default CampusListContainer;