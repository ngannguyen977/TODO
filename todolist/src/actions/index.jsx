
//nhiệm vụ của action là trả ra cái type để reducer phân tích
//action là 1 function
import * as types from './../constants/ActionTypes';

export const listAll= () => {   
    return {
        type: types.LIST_ALL
    }
}