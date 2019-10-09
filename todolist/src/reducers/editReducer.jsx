
//nhiệm vụ của reducer là phân tích xử lý cái action và 
//update lại state
// luôn luôn có giá trị mặc định là initialState

import * as types from '../constants/ActionTypes';

// giá trị phải là 1 object 
//nên ko sử dụng các reducer khác mà phải tạo cai mới
var initialState = {
    id: '',
    name: '',
    status: false
}; 
var editReducer = (state = initialState, action) =>{
    console.log("state", state)
    switch(action.type){
        case types.EDIT_TASK:
           return action.task;
        default:
            return state
    }
}
export default editReducer;