import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";

let todoCounter = 0;

function TodoItem(props) {
  return (
    <li>{props.name}<button onClick={props.onClick}>Delete</button></li>
  )
}

function AddButton(props) {
  return (
    <button onClick={props.onClick}>Add New Todo</button>
  )
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
  }

  deleteButtonClick = (id) => {
    const todos = this.state.todos;
    for (let todo in todos) {
      if (todos[todo].id === id) {
        delete todos[todo];
      }
    }

    this.setState({
      todos: todos
    });
  }

  addButtonClick = () => {
    let text = window.prompt("What is it?");
    if (text.trim().length > 0) {
      this.addTodo(text);
    }
  }

  addTodo(text) {
    const todos = this.state.todos;
    todos.push({
      text: text,
      id: todoCounter++
    });

    this.setState({
      todos: todos
    });
  }

  render() {
    /*const todosItems = this.state.todos.map((todo) =>
      <TodoItem name={todo.text} key={todo.id} onClick={(e) => this.deleteButtonClick(todo.id)} />
    );*/

    const todosItems = [];
    const todos = this.state.todos;
    for (let i = 0; i < todos.length; i++) {
      todosItems.push(<TodoItem name={todos[i].text} key={todos[i].id} onClick={(e) => this.deleteButtonClick(todos[i].id)} />);
    }

    return (
      <div>
        <ul>
          {todosItems}
        </ul>
        <AddButton onClick={this.addButtonClick} />
      </div>
    )
  }
}

ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);
