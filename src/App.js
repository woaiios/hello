import React, { Component } from 'react';
import './App.css';
import { CSSTransitionGroup } from 'react-transition-group'
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect
} from 'react-router-dom'
import Switch from 'react-router-dom/Switch';
import TodoActions from './actions/TodoActions'
import TodoList from './components/TodoList';
import Store from './stores/TodoStore'


class Home extends Component {
  constructor() {
    super()
    this.state = {
      list: ["10086", "10010"]
    }
  }
  render() {
    return <div><h2>Home</h2>
      {
        this.state.list.map((item) => {
          return <li>
            <Link to={`/detail/${item}`}> {item} </Link>
          </li>
        })
      }
    </div>
  }
}

class Detail extends Component {
  render() {
    return <div>
      <h1>Detail</h1>
      <p>{this.props.match.params.tel}</p>
    </div>
  }
}

class News extends Component {
  render() {
    return <div><h2>News</h2></div>
  }
}

class Other extends Component {
  render() {
    return <div><h2>Other</h2></div>
  }
}

class App extends Component {
  constructor() {
    super()
    this.getDataFromChild = this.getDataFromChild.bind(this)
    this.addComment = this.addComment.bind(this)
    this.refreshData = this.refreshData.bind(this)

    this.addTodo_RX = this.addTodo_RX.bind(this)
    this.addOne_RX = this.addOne_RX.bind(this)

    this.state = {
      list: [],
      msg: "helle world",
      flag: true,
      comments: [{
        author: "wbq",
        time: new Date().getTime(),
        comment: "lllllllllllllxxxxx"
      }]
    }
  }

  componentDidMount = () => {
    Store.addChangeListener(this.refreshData)
  }

  refreshData() {
    let lisData = Store.getTodoListData()
    this.setState({
      list: lisData
    })
  }

  addTodo(data) {
    TodoActions.addTodo(data)
  }

  getDataFromChild(val) {
    this.setState({
      msg: val
    })
  }

  addComment() {
    let commentObj = {
      author: this.refs.author.value,
      time: new Date().getTime(),
      comment: this.refs.comment.value
    }
    this.state.comments.push(commentObj)
    this.setState({
      comments: this.state.comments
    }
    )
  }

  fomateTime(val) {
    let min = (new Date().getTime() - val) / 1000 / 60
    if (min < 1) {
      return "刚刚"
    }
    return parseInt(min) + "分钟前"
  }

  addTodo_RX() {
    this.props.store.dispatch({
      type: "ADD_TODO",
      payload: this.refs.todoVal_RX.value
    })
  }

  addOne_RX() {
    this.props.store.dispatch((dispatch, state) => {
      setTimeout(function () {
        dispatch({
          type: "ADD_ONE",
          payload: 1
        })
      }, 2000)
    })
  }

  render() {
    let items = this.state.comments.map((item, index) => {
      return <div key={index}>
        <span> {item.author}</span>
        <span> {this.fomateTime(item.time)}</span>
        <p>{item.comment}</p>
      </div>;
    })


    const list_RX = this.props.store.getState().list;
    const count = this.props.store.getState().count;
    return (
      <div className="App">
        <h1>留言板</h1>

        <TodoList onClick={this.addTodo} list={this.state.list}></TodoList>
        <Router>
          <div>
            <NavLink exact activeClassName="active" to='/'>主页</NavLink>
            <NavLink activeClassName="active" to='/news'>新闻</NavLink>
            <NavLink activeClassName="active" to='/other'>其他</NavLink>
            <hr />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/news" component={News} />
              <Route path="/other" component={Other} />
              <Route path="/detail/:tel(\d+)?" component={Detail} />
              <Redirect from="/*" to="/" />
            </Switch>
          </div>
        </Router>
        <div className="comments">
          <CSSTransitionGroup
            transitionName="reactAnim"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {items}
          </CSSTransitionGroup>
        </div>
        <input type="text" ref="author" />
        <br></br>
        <textarea ref="comment"></textarea>
        <br></br>
        <button onClick={this.addComment}>发表哦</button>
        <br />
        <h1>----------------Redux--------------</h1>
        <input type="text" ref="todoVal_RX" />
        <button onClick={this.addTodo_RX}>Add Todo</button>
        <br/>
        {count}
        <button onClick={this.addOne_RX}>Add One</button>
        <ul>
          {
            list_RX.map((item, index) => {
              return <li key={index}>{item}</li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
