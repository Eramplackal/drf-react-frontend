import logo from "./logo.svg";
import "./App.css";
import CardComponent from "./components/CardComponent";
import DisplayCard from "./components/DisplayCard";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  return (
    <div className="App">
      <CardComponent fetchTodos={fetchTodos} />
      <DisplayCard fetchTodos={fetchTodos} todos={todos} />
    </div>
  );
}

export default App;
