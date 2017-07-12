import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
// import StudentList from './StudentList';
import CampusList from './CampusList';
// import NewChannelEntry from './NewChannelEntry';
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
            <HashRouter>
                <div>

                    <Sidebar />
                    <Navbar />
                    <main>
                        {/*<Switch>*/}
                        {/*<Route path="/students" component={StudentsList} />*/}
                        <Route path="/campuses" component={CampusList} />
                        {/*</Switch>*/}
                    </main>

                </div>
            </HashRouter>
        )
    }
}