import React, { Component } from "react";
import TaskItem from "./TaskItem";

class TaskList extends Component {
 
   render (){

    //trong Tasklist khia báo biết tasks 
    //để lấy props tên propsTask từ bên App
    var tasks = this.props.propsTask //~var {tasks} = this.props; 
   
    //hàm map sẽ copy từng phần tử và index của item
    //sau đó chỉ việc render ra TaskItem đã trả về chỗ return của taskList component
    var itemTask = tasks.map((task, index)=>{
        //bắt đầu truyền vào cho taskItem
        return <TaskItem key={task.id} index={index} task={task}/>
    })

    return (
        <table className="table tabel-bordered table-hover mt-15">
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input
                        type="text"
                        className="form-control"
                        name="filterName"
                        /> 
                    </td>
                    <td>
                        <select
                        className="form-control"
                        name="filterStatus"
                        >
                            <option value={-1}>Tat cả</option>
                            <option value={0}>Ần</option>
                            <option value={1}>Kích hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                { itemTask }
            </tbody>
        </table>
    );
   }
}
export default TaskList;