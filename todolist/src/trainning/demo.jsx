import { createStore } from 'redux'; 
import { status, sort } from './actions/index';
import myReducer from './reducers/index';

const store = createStore(myReducer);
 console.log('DEFAULT',store.getState())
//Dispatch có nhiệm vụ gửi action đến reducer
store.dispatch(status());
 console.log('TOGGLE_STATUS',store.getState());
///SAP XEP
//tạo action sort

store.dispatch(sort({
    by: 'name',
    value: -1
}));
 console.log('SORT',store.getState());