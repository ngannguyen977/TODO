import * as types from './../constants/actionTypes'; 

//ko co tham số
export const status =()=>{
    return {
        type : types.TOOGLE_STATUS
    }
}
//có tham số
export const sort =(sort)=>{
   return {
    type : types.SORT,
    sort // ~ sort : sort
   }
}
