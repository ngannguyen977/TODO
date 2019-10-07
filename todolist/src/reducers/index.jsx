import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';
import isDisplayForm from './isDisplayForm';

const myReducer = combineReducers ({
    tasks: tasksReducer // ~ tasks : tasks
})
export default myReducer;