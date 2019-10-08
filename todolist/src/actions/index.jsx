
//nhiệm vụ của action là trả ra cái type để reducer phân tích
//action là 1 function
import * as types from './../constants/ActionTypes';

export const listAll= () => {   
    return {
        type: types.LIST_ALL
    }
};
export  const addTask =(task) =>{
    return {
        type:types.ADD_TASK,
        // key là task và tham số là task
        task // ~ task: task
    }
};
export const toggleForm = () =>{
    return {
        type : types.TOGGLE_FORM
    }
}
export const openForm = () =>{
    return{
        type: types.OPEN_FORM
    }
}
export const closeForm = () =>{
    return {
        type:types.CLOSE_FORM
    }
}
export const updateStatus = (id) =>{
    return {
        type:types.UPDATE_STATUS,
        //tham so
        id // id: id
    }
}