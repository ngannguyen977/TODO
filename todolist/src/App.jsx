import React, { Component } from "react";
import TaskForm from './components/TaskForm';
import Control from './components/control';
import TaskList from './components/TaskList';
import {connect} from 'react-redux';
import * as actions from './actions/index'
import './App.css';
import { async } from "q";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            //khởi tạo tasks 
           
            // tasks: [],
            isDisplayForm: false,
            //khởi tạo task đang edit
            taskEditing: null,
            filter:{
                name:"",
                status:-1
            },
            //truyền keyword vào trong search
            keyword: "",
            //sort -> control -> app
            sort:{
                by:'name',
                value: 1
            }
        }
    }
    //làm sao cho sao khi f5 lại dữ liệu còn giữ nguyên
    //nghĩa là(gán ngược trở lại this.state.tasks)
    // //nen ta su dung lifecycle componentwillmount
   
    
    //viet theo kieu arrow để ko cần bind
    onToggleForm = () => {
       
        this.props.onToggleForm();
    }
    
    onShowForm = () =>{
        // kiem tra xem truyen du lieu tư taskform ra ngoài thành cong chua
        this.setState({
            isDisplayForm : true
        })
    }
    


    // nhận lại từ trong taskList truyền ra bằng cái function
    //tìm cái index và del khỏi danh sách, có 2 cách
    onDelete = (id) =>{
        // const {tasks} = this.state;
        // tasks.splice(id, 1)
        // this.setState({
        //     tasks: tasks
        // })
        var { tasks} = this.state;
        var index = this.findIndex(id);
        //!= -1 có nghĩa là tìm thấy
        if(index !== -1){
            // sl phan tử xóa là 1
            tasks.splice(index, 1);
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onCloseForm();
    }
    onUpdate =(id) =>{
        // tìm task theo id
        // cập nhật lại state là taskEditting
        var {tasks} = this.state;
        var index = this.findIndex(id)
        var taskSelect = tasks[index]
        this.setState({
            taskEditing : taskSelect,
           
        })
        this.onShowForm();
        
        // tiep tuc chuyền cái taskEditing này vào form để hiện thị gtri lên
    }
    //nhận 2 biến
    onFilter = (filterName='', filterStatus) =>{
        filterStatus = parseInt(filterStatus, 10)
        this.setState({
            filter :{
                name: filterName.toLowerCase(),
                status:filterStatus
            }
        })
      
        
    }
    onSearch = (keyword)=>{
        //nhận keyword từ trong search ra rồi thì setstate lại
        this.setState({
            keyword: keyword
        })
        //khi co duoc keyword -> dưới hám render kiểm tra điều kiện 
    }

    onSort = async(sortBy, sortValue) =>{
        //luu gia tri nhan duoc vào state đã khai báo dau vao trên constructor
        
        await this.setState({
               sort:{
                   by : sortBy,
                   value : sortValue
               }
        })
    }
    render (){
        // tạo biến để lấy giá trị của state ở trên 
        // lấy biến task này truyền vào Takslist với tên props là propsTask ={tasks}
        var { taskEditing } = this.state
        let {isDisplayForm} = this.props
       
        // kiem tra nếu true thì hiển thị <TaskForm> ngượ lại rỗng
       // chuyền prop vào TaskForm
       //duoi đây là 2 propr tên: onSubmit và onCloseForm
        var elmTaskForm = isDisplayForm === true ? 
                                <TaskForm 
                               
                                //chuyền props là tasks vào taskForm, qua taskForm nhận lại
                                task={taskEditing}
                                /> : '';

        return (
        <div className = "App">
            <div className="">
                <div className ={isDisplayForm ? 'col-md-4 col-xs-6' : ''}>
                    {/*// <TaskForm /> */}
                    {elmTaskForm}
                </div> 

                <div className={isDisplayForm ? 'col-md-8 col-sx-6 mt-15' : 'col-md-12 col-sx-12 mt-15' }>
                   <div className="">
                        <div className="btn-add-cv"> 
                            <button 
                                type="button" 
                                className="btn btn-primary"
                                onClick = {this.onToggleForm}
                                >
                                    <span className="fa fa-plus">Thêm công việc</span>
                                </button>
                        </div>
                       <div className="flex-content"> 
                            <Control 
                                onSearch = { this.onSearch }
                                onSort = {this.onSort}
                            />
                       </div>
                   </div>
                    {/* // từ đây ta thấy trong taskList đã có prop này onUpdateStatus*/}
                    {/* ta tiếp tuc chuyền props này vào taskItem nay trên tasklist */}
                    {/* vào taskItem xử lý button status */}
                    <TaskList 
                    //nhận từ TaskList ra bằng 1 function
                    onDelete ={this.onDelete}
                    onUpdate ={this.onUpdate}
                    //this.onFilter trong đó onFilter này là function trên App
                    // để nhận lại giá trị trong con chuyền ra thông ra
                    //onFilter trái là props chuyền vào con
                    onFilter = {this.onFilter}
                    />
                    {/* //ta bat dau vào TaskItem lấy item ra */}
                </div> 
            </div>
        </div>
        );
   }
}
const mapStateToProps = state =>{
    //chuyển state của store thành props của app
    return {
        //state là state của store
        //luc này app đã nhận được props là isDisplayForm
        isDisplayForm: state.displayReducer
    };
}
const mapDispatchToProps = (dispatch, props)=>{
    return { 
        //luc này app đã có được props là onToggleForm
        // props này sẽ được gọi ngay button thêm cv
        onToggleForm : () =>{
            dispatch (actions.toggleForm())
        }
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(App);