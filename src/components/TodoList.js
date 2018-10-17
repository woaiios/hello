import React, { Component } from 'react'

export default class TodoList extends Component {
    
    render() {
        return (
            <div>
                <input type="text" ref="todoVal" />
                <button onClick={()=>this.props.onClick(this.refs.todoVal.value)}>ADD TODO</button>
                {
                    this.props.list.map((item) => {
                        return <li key={item}>{item}</li>
                    })
                }
            </div>
        )
    }
}

