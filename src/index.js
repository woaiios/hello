import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore, combineReducers, applyMiddleware} from 'redux'
import TodoListReducer from './reducers/TodoListReducer'
import thunk from 'redux-thunk'
import CountReducer from './reducers/CountReducer'
// const reducer = (state={list:[]}, action={})=>{
//     switch (action.type) {
//         case 'ADD_TODO':
//         // 状态深拷贝
//             const newState = Object.assign({}, state)
//             newState.list.push(action.payload)
//             return newState
//         default:
//             return state
//     }
// }

// Reducer 拆分
const reducer = combineReducers({
    list: TodoListReducer,
    count: CountReducer
})

const store = createStore(reducer,{ list:[]}, applyMiddleware(thunk))

function renderPage() {
    ReactDOM.render(<App store={store} />, document.getElementById('root'));
}
renderPage()
store.subscribe(renderPage)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
