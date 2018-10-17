* `npm install -g create-react-app`
*  create-react-app my-reat-app-hello


constructor() {
    super()
}

Component生命周期：

* willMount
* render
* didMount
* willUnMount

react-router-dom

FLUX

View ➡️ Action ➡️ Dispatcher ➡️ Store ➡️ View

#### `React`单向数据流

`flux`

`App`

1. 创建一个Store

``` ts
import {EventEmitter} from 'events'
const Store = Object.assign({}, EventEmitter.prototype, {
    list:[],
    getTodoListData: function () {
        return this.list
    },
    addTodoData: function(data) {
        this.list.push(data)
        console.log("sdfsa")
    },
    emitChange: function () {
        this.emit("change")
        console.log("eewweew")
    },
    addChangeListener: function (callback) {
        this.on("change", callback)
        console.log("pppp")    
    }
}) 

export default Store
``` 

2.`App`向`Store`注册数据改变回调函数

```ts
componentDidMount = () => {
    Store.addChangeListener(this.refreshData)
  }

  refreshData() {
    let lisData = Store.getTodoListData()
    this.setState({
      list:lisData
    })
  }
```

3.搞个`View`去触发事件。
>触发事件要包装成一个Action

```ts
addTodo(data) {
    TodoActions.addTodo(data)
  }
```
4.搞个`Action`

```ts
import TodoDispatcher from '../dispatcher/TodoDispatcher'

const TodoActions = {
    addTodo: function (data) {
        TodoDispatcher.dispatch({
            actionType: 'ADD_TODO',
            payload: data
        })
    }
}

export default TodoActions;
```
>其实这个`Action` 使用`Dispatcher` 搞事情

5.看看这个 `Dispatcher`

```ts
import { Dispatcher } from 'flux'
import Store from '../stores/TodoStore'
const TodoDispatcher = new Dispatcher();
TodoDispatcher.register(function (action) {
    switch (action.actionType) {
        case 'ADD_TODO':
            Store.addTodoData(action.payload)
            Store.emitChange()
            break;

        default:
            break;
    }
})

export default TodoDispatcher
```
>这个`Dispatcher` 去改变 `store` 的数据，并且告诉 `store` 去触发数据改变事件。
>这样 `store` 就会回调注册过的监听事件的方法
>这样 `View` 就更新了
>闭环







