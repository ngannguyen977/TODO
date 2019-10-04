import React, { Component } from "react";
import TaskForm from './components/TaskForm';
import Control from './components/control';
import TaskList from './components/TaskList';
import demo from './trainning/demo';
import './App.css';
import { async } from "q";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            //khởi tạo tasks 
           
            tasks: [],
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
   
    s4(){
        return Math.floor((1+Math.random())* 0x10000).toString(16).substring(1)
    }

    generateID(){
        return this.s4() + this.s4() + '-' + this.s4() + '-' +this.s4() + '-'
        +this.s4()+ this.s4();
    }
    // tìm vị trí 
    findIndex = (id) =>{
        //lấy ds các task ra
        var { tasks} = this.state;
        var result = -1;
        //moi lan duyệt qua nhận dc 1 task và biến index
        tasks.forEach((task, index)=>{
            //kiem tra task nào có id = id nhận được
            if(task.id === id){
                result = index;
            }

        });
        // nguoc lai 
        return result;

    }
    //viet theo kieu arrow để ko cần bind
    onToggleForm = () => {
        // đang sửa form đang mở mà bấm thêm
        if(this.state.isDisplayForm && this.state.taskEditing !== null){
            this.setState({
                //khai bao từ khóa và so sánh với this.state.isDispalyForm 
                //đã khai báo ở trên
                isDisplayForm : true,
                //xóa đi taskEditing
                taskEditing: null
            })
        }else{
            this.setState({
                //khai bao từ khóa và so sánh với this.state.isDispalyForm 
                //đã khai báo ở trên
                isDisplayForm : !this.state.isDisplayForm,
                taskEditing: null
            })
        }
    }
    onCloseForm = () =>{
        // kiem tra xem truyen du lieu tư taskform ra ngoài thành cong chua
        this.setState({
            isDisplayForm : false,

        })
    }
    onShowForm = () =>{
        // kiem tra xem truyen du lieu tư taskform ra ngoài thành cong chua
        this.setState({
            isDisplayForm : true
        })
    }
    onSubmit=(data)=>{
        //data thực chất là this.state trong TaskForm truyền ra
        // bước tiếp chỉ việc lấy giá trị này push thêm vào mảng tasks
        console.log({data})
       var {tasks} = this.state;
       //phân biệt được thêm hay sửa
       if(data.id ===''){
        data.id = this.generateID()
        //lấy tasks và push thêm vào 1 data(task)
        tasks.push(data)
       }else{
           //sửa
           var index = this.findIndex(data.id);
           tasks[index] = data;
       }
        //sau đó setState lại tasks
        this.setState({
            tasks:tasks,
             //cap nhật xong để rỗng
             taskEditing: null
            
        })
        //sau khi set tieup tuc luu vao localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        //nhan lai id trong taskItem
       
        const { tasks } = this.state;
        const newTasks = tasks.map(task => {
          if (task.id === id) {
            task.status = !task.status
          }
          return task;
        })
        this.setState({
            tasks: newTasks
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
        console.log('sort ngoài app', this.state.sort)
    }
    render (){
        // tạo biến để lấy giá trị của state ở trên 
        // lấy biến task này truyền vào Takslist với tên props là propsTask ={tasks}
        var { 
            tasks, 
            isDisplayForm, 
            taskEditing, 
            filter, 
            keyword,
            sort,
            sortBy,
            sortValue
        } = this.state
        
        ///////////chức năng filter//////////
        if(filter){
            if(filter.name){
                // lấy từng task và trả về task có name đó
                tasks = tasks.filter((task)=>{
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                })
            }
            //filter theo status ko can ktra dieu kien vi luon luon ko rong
            tasks = tasks.filter((task)=>{
                // neu status = -1 lay ra het
               if(filter.status === -1){
                   return tasks;
               }else{
                   //task nào có status trùng khớp sẽ lấy task đó
                   return task.status === (filter.status === 1 ? true : false)
               }
            })    
        }
         /////////// ///////chức năng search///////////
        if(keyword){
            tasks = tasks.filter((task)=>{
                //do chỉ có name chưa có thêm desc nên tạm thời chỉ search theo name
                // lấy từng task và trả về task có name đó
                // indexof !== -1 : xem có chứa keyword ko
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            })
        }
        ////////////// chuc nang sort///////////////
        if(sortBy === 'name'){
        tasks.sort((a, b) =>{
            /////name///
            if(a.name > b.name) return sortValue;
            else if(a.name < b.name) return -sortValue;
            else return 0;
        })
       }else{
           ////status////
        tasks.sort((a, b) =>{
            //sắp xếp theo tên tăng dần, giảm dần
            if(a.status > b.status) return sortValue;
            else if(a.status < b.status) return -sortValue;
            else return 0;
        })
       }
        //var tasks = this.state.tasks;   

        // kiem tra nếu true thì hiển thị <TaskForm> ngượ lại rỗng
       // chuyền prop vào TaskForm
       //duoi đây là 2 propr tên: onSubmit và onCloseForm
        var elmTaskForm = isDisplayForm ? 
        <TaskForm 
        onSubmit = {this.onSubmit}
        onCloseForm={this.onCloseForm}
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
                    onUpdateStatus = {this.onUpdateStatus}
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
export default App;