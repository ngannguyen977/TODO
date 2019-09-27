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
    }
    onUpdate = () =>{
        this.props.onUpdate(this.props.task.id);
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
                //onClick = { this.onUpdateStatus}
                >
                {task.status === true ? 'kích hoạt' : 'ẩn'}
            </span>
            </td>
            <td className="text-center">
                <button 
                type="button" 
                className="btn btn-warning"
                onClick = {this.onUpdate}
                >
                    <span className="fa fa-pencil"></span>Sửa
                </button>
                <button type="button" className="btn btn-danger"
                onClick = {this.onDelete}
                >
                    <span className="fa fa-trash"></span>Xóa
                </button>
            </td>
        </tr>
    );
   }
}
export default TaskItem;