import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk



const initialState = {
    campuses: [],
    students: [],
    newStudent: {},
    newCampusEntry: ''

};

//ACTION TYPES

const GET_CAMPUS = 'GET_CAMPUS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const CREATE_CAMPUS = 'WRITE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const GET_STUDENT = 'GET_STUDENT';
const GET_STUDENTS = 'GET_STUDENTS';
export const REMOVE_STUDENT = 'REMOVE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

export function getStudent(student) {
    const action = { type: GET_STUDENT, student };
    return action;
}

export function getStudents(students) {
    const action = { type: GET_STUDENTS, students };
    return action;
}

export function updateStudent(student) {
    const action = { type: UPDATE_STUDENT, student };
    return action;
}
export function removeStudentById(studentId) {
    const action = { type: REMOVE_STUDENT, studentId }
    return action
}

export function getCampus(campus) {
    const action = { type: GET_CAMPUS, campus };
    return action;
}

export function getCampuses(campuses) {
    const action = { type: GET_CAMPUSES, campuses };
    return action;

}

export function createCampus(newCampusEntry) {
    const action = { type: CREATE_CAMPUS, newCampusEntry };
    return action;
}

export function updateCampus(campus) {
    const action = { type: UPDATE_CAMPUS, campus }
    return action;
}

export function removeCampusById(campusId) {
    const action = { type: REMOVE_CAMPUS, campusId }
    return action
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
                const action = getStudent(newStudent[0]);
                dispatch(action);
            });
    }

}

export function putStudent(studentId, student) {
    return function thunk(dispatch) {
        return axios.put(`/api/students/${studentId}`, student)
            .then(res => dispatch(updateStudent(res.data)))

    }
}

export function deleteStudent(studentId) {
    return function thunk(dispatch) {
        dispatch(removeStudentById(studentId))
        return axios.delete(`/api/students/${studentId}`, { id: studentId })
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

export function postCampus(campus) {

    return function thunk(dispatch) {
        return axios.post('/api/campuses', campus)
            .then(res => res.data)
            .then(newCampus => {
                const action = getCampus(newCampus);
                dispatch(action);
                // hist.push(`/campuses/${newCampus.id}`)
            });
    }
}

export function putCampus(campusId, campus) {
    return function thunk(dispatch) {
        return axios.put(`/api/campuses/${campusId}`, campus)
            .then(res => dispatch(updateCampus(res.data)))

    }
}

export function deleteCampus(campusId) {
    return function thunk(dispatch) {
        dispatch(removeCampusById(campusId))
        return axios.delete(`/api/campuses/${campusId}`, { id: campusId })
    }
}



function reducer(state = initialState, action) {

    switch (action.type) {
        case GET_STUDENTS:
            return Object.assign({}, state, { students: action.students });
        case GET_STUDENT:
            return Object.assign({}, state, { students: state.students.concat([action.student]) });
        case UPDATE_STUDENT:
            return Object.assign({}, state, {
                students: state.students.map(student => (
                    action.student.id === student.id ? action.student : student
                ))
            });
        case REMOVE_STUDENT:
            return Object.assign({}, state, {
                students: state.students.filter(student => {
                    return student.id !== action.studentId
                })
            })
        case GET_CAMPUSES:
            return Object.assign({}, state, { campuses: action.campuses });
        case GET_CAMPUS:
            return Object.assign({}, state, { campuses: state.campuses.concat([action.campus]) });
        case CREATE_CAMPUS:
            return Object.assign({}, state, { newCampusEntry: action.newCampusEntry });
        case UPDATE_CAMPUS:
            return Object.assign({}, state, {
                campuses: state.campuses.map(campus => (
                    action.campus.id === campus.id ? action.campus : campus
                ))
            });
        case REMOVE_CAMPUS:
            return Object.assign({}, state, {
                campuses: state.campuses.filter(campus => {
                    return campus.id !== action.campusId
                })
            })
        default:
            return state;
    }

}








export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))
