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
            isDisplayForm: false,
            taskEditing: null,
            filter:{
                name:"",
                status:-1
            },
            keyword: "",
            sort:{
                by:'name',
                value: 1
            }
        }
    }

    //viet theo kieu arrow để ko cần bind
    onToggleForm = () => {
        var { itemEditing } = this.props
        //tồn tại và đang edit
        if(itemEditing && itemEditing.id !==''){
            this.props.onOpenForm();
            this.props.onClearTask({
                id: '',
                name: '',
                status: false
    
            })
        }else{
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            id: '',
            name: '',
            status: false

        })
    }
    
    onShowForm = () =>{
        // kiem tra xem truyen du lieu tư taskform ra ngoài thành cong chua
        this.setState({
            isDisplayForm : true
        })
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
        let {isDisplayForm} = this.props
        return (
        <div className = "App">
            <div className="">
                <div className ={isDisplayForm ? 'col-md-4 col-xs-6' : ''}>
                <TaskForm />
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
                    
                    <TaskList 
                    onUpdate ={this.onUpdate}
                    onFilter = {this.onFilter}
                    />
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
        isDisplayForm: state.displayReducer,
        itemEditing: state.itemEditing
    };
}
const mapDispatchToProps = (dispatch, props)=>{
    return { 
        //luc này app đã có được props là onToggleForm
        // props này sẽ được gọi ngay button thêm cv
        onToggleForm : () =>{
            dispatch (actions.toggleForm())
        },
        //khi người dùng bấm thêm cv sẽ tiến hanh clear 
        onClearTask : (task) =>{
            dispatch(actions.editTask(task))
        },
        onOpenForm: () =>{
            dispatch(actions.openForm())
        }
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(App);