import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStudent } from '../store';


class NewStudentEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      campusId: -1,
      campusEntry: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeToEmail = this.handleChangeToEmail.bind(this);
    this.handleChangeToName = this.handleChangeToName.bind(this)
    this.handleChangeToCampus = this.handleChangeToCampus.bind(this);
  }

  handleSubmit(event) {
    console.log(this.props)
    console.log('name', this.state.name);
    console.log('email', this.state.email)
    event.preventDefault();
    this.props.createNewStudent({ name: this.state.name, email: this.state.email, campusId: this.state.campusId !== -1 ? this.state.campusId : null });
    this.setState({email: '', name: '', campusId: -1, campusEntry: ''})

  }

  handleChangeToEmail(event) {
    this.setState({ email: event.target.value })
  }

  handleChangeToName(event) {
    this.setState({ name: event.target.value })
  }

  handleChangeToCampus(event) {
    this.setState({campusEntry: event.target.value})
    const { campuses } = this.props;
    const campus = null
    console.log(campuses)
    if (campuses) {
      const campus = campuses.find(campus => {
        console.log(campus.name)
        console.log(campus.name === event.target.value)
        return campus.name === event.target.value
      })
      console.log(campus)
      if(campus) {
        console.log(campus.id)
        this.setState({campusId: campus.id})
      }
      console.log(this.state)
    }
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Create a Student Bro</label>
          <input
            className="form-control"
            type="text"
            name="studentName"
            placeholder="Enter student name"
            value={this.state.name}
            onChange={this.handleChangeToName} />
          <input
            className="form-control"
            type="text"
            name="studentEmail"
            placeholder="Enter student email"
            value={this.state.email}
            onChange={this.handleChangeToEmail} />
          <input
            className="form-control"
            type="text"
            name="studentCampus"
            placeholder="Does this kid go to a school or Something bro?"
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
  createNewStudent: (student) => {
    dispatch(postStudent(student));
  }
})


const StudentEntryContainer = connect(mapStateToProps, mapDispatchToProps)(NewStudentEntry);
export default StudentEntryContainer;
