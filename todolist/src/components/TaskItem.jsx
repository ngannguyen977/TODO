import React, { Component } from "react";
import TaskList from "./TaskList";

class TaskItem extends Component {
 
   render (){
    return (
        <tr>
            <td>1</td>
            <td>Học Angular 4</td>
            <td className="text-center">
                <span className="label label-danger">kích hoạt</span>
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