import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NewStudent } from './NewStudent';
import { deleteCampus } from '../store';
import { putStudent } from '../store';




class StudentList extends Component {

    constructor(props) {
        super(props);
        this.handlePut = this.handlePut.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    
    

    handleDelete(event, id) {
        const { deleteCampus } = this.props;
        event.preventDefault();
        deleteCampus(id);
        return (
            <h1>CampusHas been Delete</h1>
        )


    }

    handlePut(event, id) {
        const { putStudent } = this.props;
        event.preventDefault();
        putStudent(id, { campusId: null });

    }

    

    render() {
        const { campuses, students } = this.props;
        const currentCampus = campuses[0] && campuses.filter(campus => {
            return campus.id === +this.props.match.params.campusId
        })[0]
        console.log(currentCampus)
        return (
            <div>
                <h1>Welcome To {currentCampus && currentCampus.name}</h1>
                <img src={currentCampus && currentCampus.imgUrl} />
                <h3>Students List</h3>
                <ul>
                    {
                        students.map(student => {
                            if (student.campusId === +this.props.match.params.campusId) {
                                console.log(student);
                                return (<li key={student.id}>
                                    <NavLink to={`/students/${student.id}`} activeClassName="active">
                                        <span>{student.name}</span>
                                    </NavLink>
                                    <button
                                        className="btn btn-default"
                                        onClick={() => this.handlePut(event, student.id)}>
                                        <span className="glyphicon glyphicon-remove" />
                                    </button>
                                </li>)
                            }
                        })
                    }
                </ul>
                <div className="back-line">
                    <NavLink to={`/campuses/${currentCampus && currentCampus.id}/update`} activeClassName="active">
                        <h3>Edit this Campus</h3>
                    </NavLink>
                    <h3>DELETE THIS Campus FROM EXISTANCE
                        <button
                            className="btn btn-default"
                            onClick={() => this.handleDelete(event, currentCampus.id)}>
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
    putStudent, deleteCampus
}

const StudentListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentList));
export default StudentListContainer;