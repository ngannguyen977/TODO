import React, { Component } from "react";
import { connect}  from 'react-redux';
import * as actions from './../actions/index'

class TaskForm extends Component{
    constructor(props){
        super(props);
        //tao state luu trữ gtri của ô input ,select
        this.state = {
            id: '',
            name:'',
            status: false
        }

    }
    componentWillMount(){
        //khi taskform xuất hiện dữ liệu sẽ lặp tức đổ ra ngoài form
        //nếu tồn tại và có id 
        //lấy props itemEditing bên dưới 
        // cập nhật state lên form
        if(this.props.itemEditing && this.props.itemEditing.id !==null){
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status
            });
        }else{
            this.onClear()
        }
    }
    // do form mở lên rồi ko còn chạy vào componentWillMount nữa
    // khi vừa click vào thêm vừa click vào sửa
   //khắc phục tình trạng khi bấm thêm ko bấm sửa được
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditing){
            this.setState({
                //nhân duoc cai prop là itemEditing và set vào state
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status
            });
        }else {
            this.onClear();
        }
    }
    onExitForm = () =>{
        //gọi đến props đã được cung cấp khi map
        // lúc này trên store sẽ cập nhật lại state và trả lại
        this.props.onCloseForm();
    }

    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value =target.value;
        //ép kiểu
        if(name==='status'){
            value = target.value === 'true'? true : false
        }
        // luu lại (updste lại state trong constructor)
        this.setState({
           [name] : value
        })
    }
    
    onSave = (event) =>{
        //ngăn tình trạng load lại page
        event.preventDefault();
        // lúc này đã có props onAddTask ta chỉ việc sử dụng
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onExitForm();

    }

    onClear = () =>{
      // chỉ việc xóa hết các state 
      this.setState({
          name:'',
          status: false
      })
    }
   render (){
       if( !this.props.isDisplayForm) return null;
    return (
        <div className="panel panel-warning">
                <div className="panel-heading">
                    <div className="panel-title">
                        {/* sửa sẽ có id còn thêm ko có */}
                        { !this.state.id ? 'thêm công việc' : 'cập nhật'}
                    </div>
                    <a 
                    className="fa fa-times-circle text-right"
                    onClick = {this.onExitForm}>
                    </a>
                </div>
                <div className="panel-body">
                    <form onSubmit ={this.onSave}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={this.state.name}
                            onChange ={this.onChange}
                            />
                        </div>
                        <label>Trạng thái</label>
                        <select
                        className="form-control"
                        name="status"
                        value={this.state.status}
                        onChange ={this.onChange}
                        >
                        <option value={true}>kích hoat</option>
                        <option value={false}>Ẩn</option>
                        </select>
                        <div className="text-center">
                            
                            <button 
                            type="submit" 
                            className="btn btn-warning"
                            // khi bâm lưu lại chuyền du lieu ra lai cho app, sau do cap nhat lai
                            >
                                <span className="fa fa-plus">Lưu lại</span>
                            </button>
                            <button 
                            type="submit" 
                            className="btn btn-danger"
                            // xoa du lieu trong o input khi
                            // đã bấm tạo mới xong
                            onClick={this.onClear}
                            >
                                <span className="fa fa-close">Hủy bỏ</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
   }
}
const mapStateToProps = state =>{
    return {
       isDisplayForm: state.displayReducer,
       //muốn lấy được itemEditing cần phải tạo 1 cái props
        // được map từ state trên store(store là reducer)
        // editReducer được lấy từ reducers/index
        itemEditing : state.editReducer
    }
}

//gọi 1 action chuyển lên store đề reducer phân tích
const mapDispatchToProps = (dispatch, props) =>{
    return {
       onSaveTask : (task) =>{
           // gọi actions addTask 
           //có type là  ADD_TASK 
           // có tham số là task
           //lên reducer để thực thi
           //và ta nhận được props là onAddTask
           dispatch(actions.saveTask(task))
       },
        onCloseForm : () =>{
            // gọi actions closeForm 
           //có type là CLOSE_FORM  
           //lên reducer để thực thi
           //và ta nhận được props là onCloseForm 
           // props này sẽ đực sử dụng phia trên 
            dispatch(actions.closeForm())
        }
    }
}
export default connect (mapStateToProps, mapDispatchToProps)(TaskForm);