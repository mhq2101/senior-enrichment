import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import StudentList from './StudentList';
import CampusList from './CampusList';
import NewCampus from './NewCampus';
import store, { fetchStudents, fetchCampuses } from '../store';

export default class Main extends Component {


    componentDidMount() {
        const studentsThunk = fetchStudents();
        const campusesThunk = fetchCampuses();
        store.dispatch(studentsThunk);
        store.dispatch(campusesThunk);
    }

    render() {
        return (
            <div>
                {/*<Sidebar />*/}
                <Navbar />
                <div>
                    <Switch>
                        <Route path="/students" component={StudentList} />
                        <Route path="/campuses" component={CampusList} />
                        <Route path="/new-campus" component={NewCampus} />

                    </Switch>
                </div>
            </div>
        )
    }
}