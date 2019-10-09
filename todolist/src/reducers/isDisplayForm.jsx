
//nhiệm vụ của reducer là phân tích xử lý cái action và 
//update lại state
// luôn luôn có giá trị mặc định là initialState

import * as types from '../constants/ActionTypes';

// kieu boolen
var initialState = false; // close
var displayReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.TOGGLE_FORM:
           return !state;
        case types.OPEN_FORM:
            return true;
        case types.CLOSE_FORM:
            return false;
        default: return state
    }
}
export default displayReducer;