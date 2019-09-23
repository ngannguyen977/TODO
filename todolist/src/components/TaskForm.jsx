import React, { Component } from "react";

class TaskForm extends Component{
 
   render (){
    return (
        <div className="panel panel-warning">
                <div className="panel-heading">
                    <div className="panel-title">Add todo</div>
                    <span className="fa fa-times-circle text-right"></span>
                </div>
                <div className="panel-body">
                    <form>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                            type="text"
                            className="form-control"
                            name="name"
                            />
                        </div>
                        <label>Trạng thái</label>
                        <select
                        className="form-control"
                        name="status">
                        <option value={true}>kích hoat</option>
                        <option value={false}>Ẩn</option>
                        </select>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus">Lưu lại</span>
                            </button>
                            <button type="submit" className="btn btn-danger">
                                <span className="fa fa-close">Hủy bỏ</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
   }
}
export default TaskForm;