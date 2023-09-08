import logo from './icon.png';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const Todos = ({todos}) =>{
    return (
    <div className="todos">
        {todos.map(todo => {
          return(
            <div className="todo">
              <button onClick={() => modifyStatusTodos(todo)} className="checkbox" style={{backgroundColor: todo.status ? "#A879E6" : "white"}}>
  
              </button>
              <p>{todo.name}</p>
              <button onClick={() => handleWithEditbutton(todo)}>
                <AiOutlineEdit color={"#64697b"} size={20}></AiOutlineEdit>
              </button>
              <button onClick={() => deleteTodo(todo)}>
              <AiOutlineDelete color={"#64697b"} size={20}></AiOutlineDelete>
              </button>
            </div>
          )
        })}
      </div>
    );
  };

  async function handlewithNewButton(){
    setInputVisility(!inputVisbility);
  }
  async function handleWithEditbutton(todo){
    setSelectTodo(todo);
    setInputVisility(true);
  }
  async function getTodos(){
    const response = await axios.get("http://localhost:3333/todos");
    setTodos(response.data)
    
  }

  async function createTodo(){
    const response = await axios.post("http://localhost:3333/todos", {
      name: inputValue,
    });
    getTodos();
    setInputVisility(!inputVisbility);
    setInputValue("");
  }

  async function deleteTodo(todo){
    await axios.delete(`http://localhost:3333/todos/${todo.id}`);
    getTodos();
  }

  async function editTodo(){
    const response = await axios.put("http://localhost:3333/todos", {
    id: selectedTodo.id,
    name: inputValue,
    });
    setSelectTodo();
    setInputVisility(false);
    getTodos();
    setInputValue("");
  

  }

  async function modifyStatusTodos (todo){
    const response = await axios.put("http://localhost:3333/todos", {
      id: todo.id,
      status: !todo.status, 
    });
    getTodos();
  }

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisbility, setInputVisility] = useState(false);
  const [selectedTodo, setSelectTodo] = useState();
  useEffect(() =>{
    getTodos();
  }, []);
  return (
    <div className="App">
      <header className="container">
        <div className="header">
            <h1>Atividades</h1>
        </div>
       <Todos todos={todos}></Todos>
       <input value = {inputValue} 
       style={{display: inputVisbility ? "block" : "none"}}
       onChange={(event) =>{
          setInputValue(event.target.value);
       }} 
       className='inputName'></input>
       <button  onClick = {inputVisbility ? selectedTodo ? editTodo : createTodo : handlewithNewButton} className='newTaskButton'>{inputVisbility ? "Confirmar" : "+ Nova atividade"}</button>
      </header>
      
    </div>
  );
}

export default App;
