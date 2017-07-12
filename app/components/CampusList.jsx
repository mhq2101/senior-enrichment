import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class CampusList extends Component {

    render() {
        const { campuses } = this.props;

        return (
            <ul>
                {
                    campuses.map(campus => {
                        return (<li key={campus.id}>
                            <NavLink to={`/campus/api/${channel.id}`} activeClassName="active">
                                <span>{campus.name}</span>
                                <span className="badge">{students.filter(student => student.campusId === campus.id).length}</span>
                            </NavLink>
                        </li>)
                    })
                }
                {/*<li>
                    <NavLink to="/new-channel">Create a channel...</NavLink>
                </li>*/}
            </ul>
        )




    }


}

const mapStateToProps = function (state) {
    return {
        campuses: state.campuses
    };
}

const CampusListContainer = withRouter(connect(mapStateToProps)(CampusList));
export default CampusListContainer;