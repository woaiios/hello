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