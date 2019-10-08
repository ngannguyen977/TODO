
//nhiệm vụ của reducer là phân tích xử lý cái action và 
//update lại state
// luôn luôn có giá trị mặc định là initialState

import { switchCase } from "@babel/types";
import * as types from '../constants/ActionTypes';
import { stringify } from "querystring";

// kieu boolen
var initialState = false; // close
var displayReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.TOGGLE_FORM:
           return !state;
        case types.OPEN_FORM:
            state = true
            return state;
        case types.CLOSE_FORM:
            state = false
            return state;
        default: return state
    }
}
export default displayReducer;