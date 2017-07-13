import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function thing(students, campuses) {
    return students && students.map(student => {
        console.log(student)
        // campuses[0] && campuses.filter((campus) => {
        //     console.log(student)    
        //     return campus.id === id
        // })
    })
}

class StudentList extends Component {
    
    render() {
        const { campuses, students } = this.props;
        console.log(campuses)
        console.log(thing(students, campuses))
        return (
            <div>
                <h2>Students List</h2>
                <ul>
                    {
                         students.map(student => {
                            return (<li key={student.id}>
                                <NavLink to={`/campus/api/${student.id}`} activeClassName="active">
                                    <span>{student.name}</span>
                                    {/*<span className="badge">{' (' +  + ')'}</span>*/}
                                </NavLink>
                            </li>)
                        })
                    }
                </ul>
                <div>
                    <NavLink to="/new-campus">You could like Create a student if you want homie...</NavLink>
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

const StudentListContainer = withRouter(connect(mapStateToProps)(StudentList));
export default StudentListContainer;