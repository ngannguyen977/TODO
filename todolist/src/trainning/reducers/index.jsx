
var initialState = {
    status: false,
    sort : {
        by : 'name',
        value: 1
    }
}
//mục đích của reducer là nhận action 
// -> phân tích dựa vào type của mỗi action-> trả ra cái state mới

var myReducer  = (state = initialState, action) => {
    if(action.type === 'TOOGLE_STATUS'){
        //state chính là state trên initialState
        //cập nhật lại state
        state.status = !state.status
        //trả về state mới
        return state;
    }
    if(action.type === 'SORT'){
        // tạo biến by và value lấy từ tham số của action
        var{ by, value} = action.sort; //~ by = action.sort.by / value = action.sort.value
        var { status } = state // ~ status = state.status
        // return về state mới
        return {
            status :status,
            sort : {
                by: by,
                value: value
            }
            
        }
    }
    return  state;
    
}

export default myReducer;