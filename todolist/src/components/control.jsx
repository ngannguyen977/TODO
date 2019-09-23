import React, { Component } from "react";
import Search from './search';
import Sort from './sort';

class Control extends Component {
   render (){
    return (
       <div className="row">
           <Search />
           <Sort />
       </div> 
    );
   }
}
export default Control;