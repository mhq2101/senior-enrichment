import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deleteStudent } from '../store';


class SingleStudent extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(event, id) {
        const { deleteStudent } = this.props;
        event.preventDefault();
        deleteStudent(id);
        return (
            <h1>Student Has been Delete</h1>
        )


    }

    render() {
        const { campuses, students } = this.props;
        const currentStudent = students[0] && students.filter(student => {
            return student.id === +this.props.match.params.studentId
        })[0];
        const currentCampus = campuses[0] && campuses.filter(campus => {
            return campus.id === currentStudent.campusId
        })[0];
        return (
            <div>
                <h1>Information regarding {currentStudent && currentStudent.name}</h1>
                {/*<img src={currentCampus && currentCampus.imgUrl} />*/}
                <ul>
                    <li>
                        <span>Email Address: {currentStudent && currentStudent.email}</span>
                    </li>
                    <li >
                        <NavLink to={`/campuses/${currentCampus && currentCampus.id}`} activeClassName="active">
                            <span>Attending School: {currentCampus && currentCampus.name}</span>
                        </NavLink>
                    </li>
                </ul>
                <div className="back-line">
                    <NavLink to={`/students/${currentStudent && currentStudent.id}/update`} activeClassName="active">
                        <h3>Edit this student</h3>
                    </NavLink>
                    <h3>DELETE THIS STUDENT FROM EXISTANCE
                        <button
                            className="btn btn-default"
                            onClick={() => this.handleDelete(event, currentStudent.id)}>
                            <span className="glyphicon glyphicon-remove" />
                        </button>
                    </h3>

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

const mapDispatchToProps = {
    deleteStudent
}

const SingleStudentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleStudent));
export default SingleStudentContainer;