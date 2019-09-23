import React, { Component } from "react";

class Search extends Component {
   render (){
    return (
        <div className="col-md-6">
            <div className="input-group">
                <input
                name="keyword"
                type="text"
                className="form-control"
                placeholder="Nhập từ khóa.."
                />
                <span className="input-group-btn">
                    <button className="btn btn-primay" type="button">
                        <span className="fa fa-search mr-5">Tìm</span>
                    </button>
                </span>
            </div>
        </div>
    );
   }
}
export default Search;