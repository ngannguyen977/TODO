import React, { Component } from "react";
import Search from './search';
import Sort from './sort';

class Control extends Component {
   render (){
      
    return (
       <div className="row">
          {/* // onSearch sẽ là props truyền vào serach */}
           <Search onSearch = {this.props.onSearch} />
           <Sort 
           onSort = {this.props.onSort}
           //tiếp tục chuyền vào sort
            // sortBy = {this.props.sortBy}
            // sortValue = {this.props.sortValue}
           />
           
       </div> 
       
    );
   }
}
export default Control;