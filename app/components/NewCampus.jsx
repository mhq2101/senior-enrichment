import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCampus, createCampus } from '../store';


function NewCampusEntry(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Create a Campus</label>
        <input
          className="form-control"
          type="text"
          name="campusName"
          placeholder="Enter campus name"
          value={props.campusName}
          onChange={props.handleChange} />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Create Campus</button>
      </div>
    </form>
  );
}

const mapStateToProps = (state, ownProps) => {
  return { campusName: state.newCampusEntry }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChange: (event) => {
      dispatch(createCampus(event.target.value))
    },
    handleSubmit: (event) => {
      event.preventDefault();
      const campusName = event.target.campusName.value;
      dispatch(postCampus({name: campusName, imgUrl: '/poot.jpg'}))
      dispatch(createCampus(''));
      
    }
  }
}

const CampusEntryContainer = connect(mapStateToProps, mapDispatchToProps)(NewCampusEntry);
export default CampusEntryContainer;
