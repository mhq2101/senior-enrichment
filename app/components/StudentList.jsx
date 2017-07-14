import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { deleteStudent } from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class StudentList extends Component {



    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event, id) {
        const { deleteStudent } = this.props;
        event.preventDefault();
        deleteStudent(id);

    }

    render() {
        const { campuses, students } = this.props;
        console.log(this.props)
        // console.log(thing(students, campuses))
        return (
            <div>
                <h2>Students List</h2>
                <ul>
                    {
                        students.map(student => {
                            return (<li key={student.id}>
                                <NavLink to={`/students/${student.id}`} activeClassName="active">
                                    <span>{student.name}</span>
                                </NavLink>
                                <button
                                    className="btn btn-default"
                                    onClick={() => this.handleDelete(event, student.id)}>
                                    <span className="glyphicon glyphicon-remove" />
                                </button>
                            </li>)
                        })
                    }
                </ul>
                <div>
                    {/*<NavLink to="/new-campus">You could like ADD a student if you want homie...</NavLink>*/}
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

const StudentListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentList));
export default StudentListContainer;