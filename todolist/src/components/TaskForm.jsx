import React, { Component } from "react";
import { connect}  from 'react-redux';
import * as actions from './../actions/index'

class TaskForm extends Component{
    constructor(props){
        super(props);
        //tao state luu trữ gtri của ô input ,select
        this.state = {}

    }
    componentWillMount(){
        //khi taskform xuất hiện dữ liệu sẽ lặp tức đổ ra ngoài form
        //nếu tồn tại
        if(this.props.task){
            this.setState({
                //prop từ app truyền vào là task
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            });
        }
    }
    // do form mở lên rồi ko còn chạy vào componentWillMount nữa
    // khi vừa click vào thêm vừa click vào sửa
   //khắc phục tình trạng khi bấm thêm ko bấm sửa được
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                //prop từ app truyền vào là task
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            });
        }else if(nextProps && nextProps.task === null){
            // trường hợp bấm sửa rồi bấm thêm ko dc
            //nếu nextProps.task ko tồn tại thì set lại form thêm
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }
    }
    onCloseForm = () =>{
       // console.log('close form')
        // gọi thông qua props onCloseForm bên ngoài
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
    // onChange = (event) =>{

    //     var target = event.target
    //     this.setState({
    //        name : target.value
    //     })
    // }
    onSubmit = (event) =>{
        //ngăn tình trạng load lại page
        event.preventDefault();
        // lúc này đã có props onAddTask ta chỉ việc sử dụng
        this.props.onAddTask(this.state);
       this.onClear();
       this.onCloseForm();

    }

    onClear = () =>{
      // chỉ việc xóa hết các state 
      this.setState({
          name: '',
          status: false
      })
    }
   render (){
       var {id} = this.state;
    return (
        <div className="panel panel-warning">
                <div className="panel-heading">
                    <div className="panel-title">
                        {/* sửa sẽ có id còn thêm ko có */}
                        { id !=='' ? 'cập nhật' : 'thêm công việc'}
                    </div>
                    <a 
                    className="fa fa-times-circle text-right"
                    onClick = {this.onCloseForm}>
                    </a>
                </div>
                <div className="panel-body">
                    <form onSubmit ={this.onSubmit}>
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

    }
}

//gọi 1 action chuyển lên store đề reducer phân tích
const mapDispatchToProps = (dispatch, props) =>{
    return {
       onAddTask : (task) =>{
           // gọi actions addTask 
           //có type là  ADD_TASK 
           // có tham số là task
           //lên reducer để thực thi
           //và ta nhận được props là onAddTask
           dispatch(actions.addTask(task))
       }
    }
}
export default connect (mapStateToProps, mapDispatchToProps)(TaskForm);