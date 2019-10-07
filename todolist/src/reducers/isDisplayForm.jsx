
//nhiệm vụ của reducer là phân tích xử lý cái action và 
//update lại state
// luôn luôn có giá trị mặc định là initialState

import { switchCase } from "@babel/types";
import * as types from '../constants/ActionTypes';
import { stringify } from "querystring";

// kieu boolen
var initialState = false; // close
var tasksReducer = (state = initialState, action) =>{
    switch(action.type){
       
        default: return state
    }
}
export default tasksReducer;