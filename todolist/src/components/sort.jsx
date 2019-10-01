import React, { Component } from "react";

class Sort extends Component {
    constructor(props){
        super(props);
        this.state = {
            sort:{
                by:'name',
                value: 1
            }
        }
    }
    onClick = (sortBy, sortValue) =>{
        //truyền vào onSort 1 biến
        this.setState({
            sort:{
                by:sortBy,
                value:sortValue
            }
        })
        //khi nhận được onSort từ app->control
        // thì trong này sẽ truyền vào 2 biến gắn vào onSort chuyền ra ngoài
        this.props.onSort(this.state.sort)
    }
   render (){
    return (
     
        <div className="col-md-6">
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenu1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
                >
                    Sắp xếp
                    <span className="fa fa-caret-square-o-down ml-5"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    
                    <li 
                    //arrow fuction do có truyền tham số do sort theo
                    onClick ={()=>this.onClick('name', 1)}
                    >
                        <a 
                        role="button" 
                        // add thêm class vào sort_selected
                       
                        >
                            <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
                        </a>
                    </li>
                    <li
                    onClick ={()=>this.onClick('name', -1)}
                    >
                         <a 
                        role="button" 
                        // add thêm class vào sort_selected
                        
                        >
                            <span className="fa fa-sort-alpha-asc pr-5">Tên Z-A</span>
                        </a>
                    </li>
                    <li
                    onClick ={()=>this.onClick('status', 1)}
                    >
                         <a 
                        role="button" 
                        // add thêm class vào sort_selected
                        
                        >
                            <span className="fa fa-sort-alpha-asc pr-5">Trạng thái kích hoạt</span>
                        </a>
                    </li>
                    <li
                    onClick ={()=>this.onClick('status', -1)}
                    >
                        <a 
                        role="button" 
                        
                        >
                            <span className="fa fa-sort-alpha-asc pr-5">Trạng thái ẩn</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    );
   }
}
export default Sort;