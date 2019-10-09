import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';
import displayReducer from './isDisplayForm';
import editReducer from './editReducer';

const myReducer = combineReducers ({
    tasks: tasksReducer, // ~ tasks : tasks
    displayReducer,//displayReducer:displayReducer
    editReducer
})
export default myReducer;