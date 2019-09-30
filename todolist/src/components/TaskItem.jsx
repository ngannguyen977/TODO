import React, { Component } from "react";
import TaskList from "./TaskList";

class TaskItem extends Component {

    onUpdateStatus = () => {
        //truyền vào tham số this.props.task.id cho onUpdateStatus 
        //mà TaskList truyền vào
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDelete = () =>{
         //chuyền ra cho TaskList 1 id
        this.props.onDelete(this.props.task.id)
        console.log("event",this.props.task.id)
    }
    onUpdate = () =>{
        this.props.onUpdate(this.props.task.id);
        console.log("this id", this.props.task.id)
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
                onClick = {this.onUpdate}>
                    <span className="fa fa-pencil"></span>Sửa
                </button>
                <button type="button" className="btn btn-danger"
                // khi click delete
                // truyền ra ngoài app và sẽ xóa phần tử trong ds tasks
                // cập nhật lại localStore
                onClick = {this.onDelete}>
                    <span className="fa fa-trash"></span>Xóa
                </button>
            </td>
        </tr>
    );
   }
}
export default TaskItem;