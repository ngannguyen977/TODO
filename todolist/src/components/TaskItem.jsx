import React, { Component } from "react";
import TaskList from "./TaskList";

class TaskItem extends Component {
 
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
                className={task.status === true ? 'label label-success' : 'label label-danger'}>
                {task.status === true ? 'kích hoạt' : 'ẩn'}
            </span>
            </td>
            <td className="text-center">
                <button type="button" className="btn btn-warning">
                    <span className="fa fa-pencil"></span>Sửa
                </button>
                <button type="button" className="btn btn-danger">
                    <span className="fa fa-trash"></span>Xóa
                </button>
            </td>
        </tr>
    );
   }
}
export default TaskItem;