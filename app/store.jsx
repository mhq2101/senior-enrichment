import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk



const initialState = {
    campuses: [],
    students: [],
    newStudentEntry: '',
    newCampusEntry: ''

};

//ACTION TYPES

const GET_CAMPUS = 'GET_CAMPUS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const CREAT_CAMPUS = 'WRITE_CAMPUS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const GET_STUDENT = 'GET_STUDENT';
const GET_STUDENTS = 'GET_STUDENTS';

export function getStudent(student) {
    const action = { type: GET_STUDENT, student };
    return action;
}

export function getStudents(students) {
    const action = { type: GET_STUDENTS, students };
    return action;
}

export function getCampus(campus) {
    const action = { type: GET_CAMPUS, campus };
    return action;
}

export function getCampuses(campuses) {
    const action = { type: GET_CAMPUSES, campuses };
    return action;

}


export function fetchStudents() {

    return function thunk(dispatch) {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(students => {
                const action = getStudents(students);
                dispatch(action);
            });
    }
}

export function postStudent(student) {

    return function thunk(dispatch) {
        return axios.post('/api/students', student)
            .then(res => res.data)
            .then(newStudent => {
                const action = getStudent(newStudent);
                dispatch(action);
            });
    }

}

export function fetchCampuses() {

    return function thunk(dispatch) {
        return axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => {
                const action = getCampuses(campuses);
                dispatch(action);
            });
    }
}

export function postCampus(campus, hist) {

    return function thunk(dispatch) {
        return axios.post('/api/campuses', campus)
            .then(res => res.data)
            .then(newCampus => {
                const action = getCampus(newCampus);
                dispatch(action);
                hist.push(`/campuses/${newCampus.id}`)
            });
    }

}

function reducer(state = initialState, action) {

    switch (action.type) {


        case GET_STUDENTS:
            return Object.assign({}, state, { students: action.students });
        case GET_STUDENT:
            return Object.assign({}, state, { students: state.students.concat([action.student]) });
        case GET_CAMPUSES:
            return Object.assign({}, state, { campuses: action.campuses });
         case GET_CAMPUS:
            return Object.assign({}, state, { campuses: state.campuses.concat([action.campus]) });

        default:
            return state;
    }

}








export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))
