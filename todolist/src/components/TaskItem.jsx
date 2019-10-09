
// tại taskItem connect đến store và dispatch 1 action
import React, { Component } from "react";
import TaskList from "./TaskList";
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class TaskItem extends Component {
    showStatusElement(){
        return (
            <span className ={this.props.task.status ? 'label label-danger' : 
            'label label-info' }
            onClick ={this.onUpdateStatus}
            >
            {this.props.task.status === true ? 'kich hoạt': 'ẩn'}
            </span>
        )
    }
    onUpdateStatus = () => {
        //xác định id để thực hiện update
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDeleteItem = () =>{
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();

    }
    onSelectedItem = () =>{
        //onOpenForm đã được map dưới kia
        console.log("edit item",this.props.task )
       this.props.onOpenForm();
       //có tham số là cái task
       this.props.onEditTask(this.props.task);
    }

   render (){
    // nhận  lại props từ TaskList chỗ map
    var { task, index } = this.props; // 
    return (
      
        <tr>
            <td>{index+1}</td>
            <td>{task.name}</td>
            <td className="text-center">
                {/* // kiem tra nếu true thì add thêm class  */}
                <span 
                className={task.status === true ? 'label label-success' : 'label label-danger'}
                onClick = { this.onUpdateStatus}
                >
                {task.status === true ? 'kích hoạt' : 'ẩn'}
            </span>
            </td>
            <td className="text-center">
                <button 
                type="button" 
                className="btn btn-warning"
                //khi click vào update taskItem sẽ truyền dữ lieu ra ngoài app
                //sau đó vào onUpdate của app và cập nhật lại taskEditing
                //tasEditing tiêp tục truyền vào TaskForm
                //lúc nya2 sẽ cập nhật lại state là setState
                onClick = {this.onSelectedItem}>
                    <span className="fa fa-pencil"></span>Sửa
                </button>
                <button type="button" className="btn btn-danger"
                // khi click delete
                // truyền ra ngoài app và sẽ xóa phần tử trong ds tasks
                // cập nhật lại localStore
                onClick = {this.onDeleteItem}>
                    <span className="fa fa-trash"></span>Xóa
                </button>
            </td>
        </tr>
    );
   }
}
const mapStateToProps = state =>{
    return{

    }
};
const mapDispatchToProps =(dispatch, props)=>{
    return{
        onUpdateStatus :(id)=>{
            //dispatch action updateStatus
            dispatch(actions.updateStatus(id))
        },
        //sử dụng props này trên button xóa
        onDeleteTask: (id) =>{
            dispatch(actions.deleteTask(id))
        },
        onCloseForm : () =>{
            // gọi actions closeForm 
           //có type là CLOSE_FORM  
           //lên reducer để thực thi
           //và ta nhận được props là onCloseForm 
           // props này sẽ đực sử dụng phia trên 
            dispatch(actions.closeForm())
        },
        onOpenForm : () =>{
            dispatch(actions.openForm())
        },
        //gọi onEditTask và truyền tham số là 1 cái task
        onEditTask : (task) =>{
            dispatch(actions.editTask(task))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);