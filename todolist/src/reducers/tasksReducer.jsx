
//nhiệm vụ của reducer là phân tích xử lý cái action và 
//update lại state
// luôn luôn có giá trị mặc định là initialState

import { switchCase } from "@babel/types";
import * as types from '../constants/ActionTypes';
import { stringify } from "querystring";

var s4 = () =>{
    return Math.floor((1+Math.random())* 0x10000).toString(16).substring(1)
}

var randomID = () =>{
    return s4() + s4() + '-' + s4() + '-' +s4() + '-'
    +s4()+ s4();
}
// tìm vị trí 
var findIndex = (tasks,id) =>{
    var result = -1;
    //moi lan duyệt qua nhận dc 1 task và biến index
    tasks.forEach((task, index)=>{
        //kiem tra task nào có id = id nhận được
        if(task.id === id){
            result = index;
        }
    });
    // nguoc lai 
    return result;

}

// là array hay object là dựa vào data
var data = JSON.parse(localStorage.getItem('tasks'));
console.log("data trước thêm", data)
var initialState = data ? data : [];
var tasksReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            var newTask = {
                id : randomID(),
                //task này là key trong action /index
                name: action.task.name, 
                status: action.task.status
            }
            state.push(newTask);
            // //set item tasks và value là state
            // //luu vao localStore dạng string
            localStorage.setItem('tasks',JSON.stringify(state))
            console.log("data sau thêm", data)
            return [...state];
        case types.UPDATE_STATUS:
            var id = action.id
            var index = findIndex(state,id);
            state[index.status] = !state[index.status];
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default: return state
    }
}
export default tasksReducer;