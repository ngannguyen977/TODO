import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';

const myReducer = combineReducers ({
    tasks: tasksReducer // ~ tasks : tasks
})
export default myReducer;