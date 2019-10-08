import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from 'react-redux';

class TaskList extends Component {
    constructor(props){
        super(props);
        // khi nhập gti phải luu gia tri vao state
        // phải đặt trùng tên với name của input bên dưới
        this.state = {
            filterName : '',
            filterStatus: -1 // all: -1, active: 1, an : 0
          
        }
    }
    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        //chuyền ra ngoài cái value nếu name = "filterName"
       
        this.props.onFilter(
            name ==='filterName' ? value : this.state.filterName,
            name ==='filterStatus' ? value : this.state.filterStatus
        )
        // lưu giá trị khi nguoi dung nhập input
        this.setState({
            [name] : value
        });


    }
   render (){
    // todos sẽ lên store lấy initialState thông qua reducer
    var {tasks} = this.props;
    var {filterName, filterStatus}  = this.state;
    //trong Tasklist khia báo biết tasks 
    //để lấy props tên propsTask từ bên App
    //hàm map sẽ copy từng phần tử và index của item
    //sau đó chỉ việc render ra TaskItem đã trả về chỗ return của taskList component
    var itemTask = tasks.map((task, index)=>{
       if(task){
            //bắt đầu truyền vào cho taskItem
            return <TaskItem 
            key={task.id} 
            index={index} // index = {task.index}
            task={task}
            //tiep tuc truyen vao cho taskItem
            onDelete = {this.props.onDelete}
            onUpdate = {this.props.onUpdate}
            />
       }
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
                        // lưu vào value
                        value={filterName}
                        onChange = {this.onChange}
                        /> 
                    </td>
                    <td>
                        <select
                        className="form-control"
                        name="filterStatus"
                        value={filterStatus}
                        onChange = {this.onChange}
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
// lấy các state của store chuyền thành các props của component này
//state này chính là state trên store trong taskReducer
const mapStateToProps = (state) =>{
    return {
        //có props là tasks bên trái
        // tasks bên phải là key trong reducer/index
        tasks: state.tasks
    }
}

export default connect(mapStateToProps, null)(TaskList) ;