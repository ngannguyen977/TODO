import React, { Component } from "react";
import TaskForm from './components/TaskForm';
import Control from './components/control';
import TaskList from './components/TaskList';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            //khởi tạo tasks 
            tasks: [],
            isDisplayForm: false
        }
    }
    //làm sao cho sao khi f5 lại dữ liệu còn giữ nguyên
    //nghĩa là(gán ngược trở lại this.state.tasks)
    //nen ta su dung lifecycle componentwillmount
    componentWillMount(){
        if(localStorage && localStorage.getItem('tasks')){
            //parse lai chuỗi luu tren localstore thành JSON
            var tasks =JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            })
        }
    }
    onGenerateData = () =>{
        //tạo dữ liệu cho tasks
        var tasks = [
            {
                id: this.generateID(),
                name:'angular',
                status: true
            },
            {
                id: this.generateID(),
                name:'Node',
                status: false
            },
            {
                id: this.generateID(),
                name:'bootstrap',
                status: true
            }
        ];
        //set lại tasks ban đầu là rỗng
        // this.setState({
        //     tasks:setTasks
        // });
        //luu vao localStorage dang string
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    s4(){
        return Math.floor((1+Math.random())* 0x10000).toString(16).substring(1)
    }

    generateID(){
        return this.s4() + this.s4() + '-' + this.s4() + '-' +this.s4() + '-'
        +this.s4()+ this.s4();
    }

    //viet theo kieu arrow để ko cần bind
    onToggleForm = () => {
        this.setState({
            //khai bao  từ khóa và so sánh với this.state.isDispalyForm 
            //đã khai báo ở trên
            isDisplayForm : ! this.state.isDisplayForm
        })
    }
    onCloseForm = () =>{
        // kiem tra xem truyen du lieu tư taskform ra ngoài thành cong chua
        // console.log("close");
        this.setState({
            isDisplayForm : false
        })
    }

    render (){
        // tạo biến để lấy giá trị của state ở trên 
        // lấy biến task này truyền vào Takslist với tên props là propsTask ={tasks}
        var { tasks, isDisplayForm } = this.state
        //var tasks = this.state.tasks;   

        // kiem tra nếu true thì hiển thị <TaskForm> ngượ lại rỗng
        var elmTaskForm = isDisplayForm ?<TaskForm onCloseForm={this.onCloseForm} /> : '';

        return (
        <div className = "App">
            <div className="">
                <div className ={isDisplayForm ? 'col-md-4 col-xs-6' : ''}>
                    {/*// <TaskForm /> */}
                    {elmTaskForm}
                </div> 

                <div className={isDisplayForm ? 'col-md-8 col-sx-6 mt-15' : 'col-md-12 col-sx-12 mt-15' }>
                    <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick = {this.onToggleForm}
                    >
                        <span className="fa fa-plus">Thêm công việc</span>
                    </button>
                    <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={()=>this.onGenerateData()}
                    >
                        <span className="fa fa-plus">Generate data</span>
                    </button>
                    <Control />
                    <TaskList propsTask = {tasks}/>
                    {/* //ta bat dau vào TaskItem lấy item ra */}
                </div> 
            </div>
        </div>
        );
   }
}
export default App;