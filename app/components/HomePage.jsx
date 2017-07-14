import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


export default class HomePage extends Component {
    render() {
        return (
            <div>
                <h1 className="large-font">WELCOME TO THE HOMEPAGE</h1>
                <div className="large-font">
                    <h3>
                        <NavLink to="/students" activeClassName="active">Students</NavLink>
                    </h3>
                    <h3>
                        <NavLink to="/campuses" activeClassName="active">Campuses</NavLink>
                    </h3>
                </div>
            </div>
        )
    }
}