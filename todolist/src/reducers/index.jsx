import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';
import displayReducer from './isDisplayForm';

const myReducer = combineReducers ({
    tasks: tasksReducer, // ~ tasks : tasks
    displayReducer//displayReducer:displayReducer
})
export default myReducer;