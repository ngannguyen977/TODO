import React, { Component } from "react";

class Search extends Component {
    constructor(props){
        super(props);
        this.state ={
            keyword:''
        }
    }

    onChange =(e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            
            [name]:value
        })

    }
    onSearch =()=>{
        //truyền ra ngoài cái keyword
        this.props.onSearch(this.state.keyword)
    }
    render (){
        var { keyword} = this.state;
    return (
        <div className="col-md-6 mt-15">
            <div className="input-group">
                <input
                name="keyword"
                type="text"
                className="form-control"
                placeholder="Nhập từ khóa.."
                value={keyword}
                onChange={this.onChange}
                />
                <span className="input-group-btn">
                    <button 
                    className="btn btn-primay" 
                    type="submit"
                    onClick = {this.onSearch}
                    >
                        <span className="fa fa-search mr-5">Tìm</span>
                    </button>
                </span>
            </div>
        </div>
    );
   }
}
export default Search;