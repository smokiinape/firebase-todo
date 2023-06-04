import Todo from "./Todo";
import React, {useState, useEffect} from "react";
import { addTodosDB, fetchFromDB, updateTodosDB, deleteTodoDB } from "../db/operation";

function TodoList() {

const [input, setInput] = useState("")
const [Todos, setTodos] = useState([])
const [toggled, setToggle] = useState(false)

    const handleChange = (event) => {
    
        setInput(event.target.value)
    }

const handleSubmit = (event) => {
    event.preventDefault();
    //Lägg till todo, både i UI och DB
    addTodo()
    setInput("")
}

const addTodo = () => {
    const newTodo = {
        desc: input,
        completed: false
    }
    addTodosDB(newTodo)
    setTodos([...Todos, newTodo])
}

const editTodo = (id, newDesc) => {
    console.log("in editTodo: ", id, newDesc)
    const editedList = Todos.map((item) => {
        if(id == item.id) {
            updateTodosDB(id, {...item, desc: newDesc})
            return {...item, desc: newDesc}
        }
        return item
    })
    setTodos(editedList)
}

const toggleCompleted = (id) => {
    toggled ? setToggle(false) : setToggle(true)
    console.log("in completedTodo: ", id)
    const editedList = Todos.map((item) => {
        if(id == item.id) {
            updateTodosDB(id, {...item, completed: !item.completed})
            return {...item, completed: !item.completed}
        }
        return item
    })
    setTodos(editedList)

}

const deleteTodo = (id) => {
    console.log("delete todo")
    const remainingTodos = Todos.filter(item => {
        return id  !== item.id;
    })
    deleteTodoDB(id)
    setTodos(remainingTodos)

}



useEffect(( ) => {
    console.log(Todos)
    console.log("use effect körs")
    fetchFromDB().then((newTodo) => {
        setTodos(newTodo)
    });
}, [Todos.length])


    return(
      <div>
    <h1>My Todos</h1>
    <form onSubmit={handleSubmit}>
        <label htmlFor="">Add a todo!</label>
        <input type="text"  onChange={handleChange} value={input}/>
        <button type="submit">Add</button>
    </form>
    <ul>
        {Todos.map((item) => {
           return <Todo
           key={item.id}
           id={item.id}
           desc={item.desc}
           completed={item.completed}
           toggleCompleted={toggleCompleted}
           editTodo={editTodo}
           deleteTodo={deleteTodo}
            />
        })};

    </ul>
      </div>
    )
  
  }

  export default TodoList