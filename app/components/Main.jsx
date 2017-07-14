import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import StudentList from './StudentList';
import CampusList from './CampusList';
import NewCampus from './NewCampus';
import NewStudent from './NewStudent';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import ChangeStudent from './ChangeStudent';
import ChangeCampus from './ChangeCampus';
import HomePage from './HomePage'
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
                        <Route exact path='/' component={HomePage} />
                        <Route exact path="/students" component={StudentList} />
                        <Route exact path="/students/:studentId" component={SingleStudent} />
                        <Route path="/students/:studentId/update" component={ChangeStudent} />
                        <Route exact path="/campuses" component={CampusList} />
                        <Route exact path="/campuses/:campusId" component={SingleCampus} />
                        <Route path="/campuses/:campusId/update" component={ChangeCampus} />
                        <Route path="/new-campus" component={NewCampus} />
                        <Route path="/new-student" component={NewStudent} />
                    </Switch>
                </div>
            </div>
        )
    }
}