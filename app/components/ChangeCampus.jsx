import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putCampus } from '../store';


class ChangeStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imgUrl: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeToImg = this.handleChangeToImg.bind(this);
        this.handleChangeToName = this.handleChangeToName.bind(this)
    }


    handleSubmit(event, id) {
        event.preventDefault();
        const updateObj = {};
        if (this.state.name !== '') {
            updateObj.name = this.state.name;
        }
        if (this.state.imgUrl !== '') {
            updateObj.imgUrl = this.state.imgUrl;
        }
        this.props.update(id, updateObj);
        this.setState({ name: '', imgUrl: '' })

    }

    handleChangeToImg(event) {
        this.setState({ imgUrl: event.target.value })
    }

    handleChangeToName(event) {
        this.setState({ name: event.target.value })
    }


    render() {
        const { campuses, students } = this.props;
        const currentCampus = campuses[0] && campuses.filter(campus => {
            return campus.id === +this.props.match.params.campusId
        })[0];
        return (
            <form onSubmit={() => this.handleSubmit(event, currentCampus.id)}>
                <div className="form-group">
                    <label htmlFor="name">Change this Campus Bro</label>
                    <input
                        className="form-control"
                        type="text"
                        name="studentName"
                        placeholder="Enter new campus name"
                        value={this.state.name}
                        onChange={this.handleChangeToName} />
                    <input
                        className="form-control"
                        type="text"
                        name="studentEmail"
                        placeholder="Enter image URL"
                        value={this.state.imgUrl}
                        onChange={this.handleChangeToImg} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Change Campus</button>
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
    update: (id, campus) => {
        dispatch(putCampus(id, campus));
    }
})


const ChangeStudentContainer = connect(mapStateToProps, mapDispatchToProps)(ChangeStudent);
export default ChangeStudentContainer;
