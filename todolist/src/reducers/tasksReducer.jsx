
//nhiệm vụ của reducer là phân tích xử lý cái action và 
//update lại state
// luôn luôn có giá trị mặc định là initialState
// STATE  là mảng chứa các phần tử
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
        case types.SAVE_TASK:
            var task = {
                id: action.task.id, // chỗ này có thể rỗng hoặc có giá trị
                name: action.task.name, 
                status: action.task.status
            };
            //nếu đã có id thì TH cập nhật
            // ngược lại là thêm cv
            if(!task.id){
                //nếu ko có id thì tạo randomID
              task.id = randomID();
              //sau đó push vào ds các task
              state.push(task);
            }else{
                index = findIndex(state,task.id);
                state[index]= task;
            }
            // //luu vao localStore dạng string
            localStorage.setItem('tasks',JSON.stringify(state))
            return [...state];

        case types.UPDATE_STATUS:
            var id = action.id
            var index = findIndex(state,id);
            //state phần tử index
            state[index] = {
                //tạo mới bằng việc copy state[index]
                ...state[index],
                status: !state[index].status
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK: 
            var id = action.id;
            var index = findIndex(state, id)
            state.splice(index,1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default: return state
    }
}
export default tasksReducer;