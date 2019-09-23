import React, { Component } from "react";

class Sort extends Component {
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
                    <li>
                        <a role="button" className="sort_selected">
                            <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
                        </a>
                    </li>
                    <li>
                        <a role="button">
                            <span className="fa fa-sort-alpha-desc">
                                Tên A-Z
                            </span>
                        </a>
                    </li>
                    <li>
                        <a role="button">
                            Trạng thái kích hoạt
                        </a>
                    </li>
                    <li>
                        <a role="button">
                            Trạng thái ẩn
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    );
   }
}
export default Sort;