import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putStudent } from '../store';


class ChangeStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            campusId: -1,
            campusEntry: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeToEmail = this.handleChangeToEmail.bind(this);
        this.handleChangeToName = this.handleChangeToName.bind(this)
        this.handleChangeToCampus = this.handleChangeToCampus.bind(this);
    }


    handleSubmit(event, id) {
        event.preventDefault();
        const updateObj = {};
        if (this.state.email !== '') {
            updateObj.email = this.state.email;
        }
        if (this.state.name !== '') {
            updateObj.name = this.state.name;
        }
        if (this.state.campusId !== -1) {
            updateObj.campusId = this.state.campusId;
        }
        this.props.update(id, updateObj);
        this.setState({ email: '', name: '', campusId: -1, campusEntry: '' })

    }

    handleChangeToEmail(event) {
        this.setState({ email: event.target.value })
    }

    handleChangeToName(event) {
        this.setState({ name: event.target.value })
    }

    handleChangeToCampus(event) {
        this.setState({ campusEntry: event.target.value })
        const { campuses } = this.props;
        const campus = null;
        if (campuses) {
            const campus = campuses.find(campus => {
                return campus.name === event.target.value
            })
            if (campus) {
                this.setState({ campusId: campus.id })
            }
        }
    }


    render() {
        const { campuses, students } = this.props;
        const currentStudent = students[0] && students.filter(student => {
            return student.id === +this.props.match.params.studentId
        })[0];
        return (
            <form onSubmit={() => this.handleSubmit(event, currentStudent.id)}>
                <div className="form-group">
                    <label htmlFor="name">Create a Student Bro</label>
                    <input
                        className="form-control"
                        type="text"
                        name="studentName"
                        placeholder="Enter new student name"
                        value={this.state.name}
                        onChange={this.handleChangeToName} />
                    <input
                        className="form-control"
                        type="text"
                        name="studentEmail"
                        placeholder="Enter new student email"
                        value={this.state.email}
                        onChange={this.handleChangeToEmail} />
                    <input
                        className="form-control"
                        type="text"
                        name="studentCampus"
                        placeholder="Does this kid go to a new school or Something bro?"
                        value={this.state.campusEntry}
                        onChange={this.handleChangeToCampus} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Create Student</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        campuses: state.campuses,
        students: state.students
    };
}

const mapDispatchToProps = (dispatch) => ({
    update: (id, student) => {
        dispatch(putStudent(id, student));
    }
})


const ChangeStudentContainer = connect(mapStateToProps, mapDispatchToProps)(ChangeStudent);
export default ChangeStudentContainer;
