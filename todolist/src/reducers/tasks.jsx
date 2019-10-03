
//nhiệm vụ của reducer là phân tích xử lý cái action và 
//update lại state
// luôn luôn có giá trị mặc định là initialState

import { switchCase } from "@babel/types";
import * as types from './../constants/ActionTypes';

// là array hay object là dựa vào data
var initialState = [];

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.LIST_ALL:
            return state;
        default: return state
    }
}
export default myReducer;