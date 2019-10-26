import React, { useState, useEffect } from "react";
import "./Grid.scss";
import Content from "./components/Content/Content";
import Todos from "./components/Todo/Todos";
import Filter from "./components/Filter/Filter";
import TodoAdd from "./components/TodoAdd/TodoAdd";
import MellonTitle from "./components/MellonTitle/MellonTitle";
import Footer from "./components/Footer/Footer";

import "./style.scss";

const App = props => {
  const [todo, setTodo] = useState([
    {
      id: 1,
      filter: "HARD",
      checked: false,
      edit: false,
      content: "Be a good person"
    },
    {
      id: 2,

      filter: "HARD",
      checked: false,
      edit: false,
      content: "Read something cool"
    },
    {
      id: 3,
      filter: "EASY",
      checked: false,
      edit: false,
      content: "Think about Charlie"
    },
    {
      id: 4,
      filter: "HARD",
      checked: false,
      edit: false,
      content: "Survive in A-team"
    }
  ]);

  const [addTodo, setAddTodo] = useState();
  const [inputNew, setInputNew] = useState();
  const [inputOld, setInputOld] = useState();
  const [inputEdit, setInputEdit] = useState();
  const [difficulty, setDifficulty] = useState("EASY");
  const [filter, setFilter] = useState("ALL");

  const filterHandle = e => {
    let upperFilter = e.target.value.toUpperCase();
    console.log(upperFilter);
    setFilter(upperFilter);
  };

  const removeHandle = e => {
    const newTodos = todo.filter(todo => Number(e.target.id) !== todo.id);
    setTodo(newTodos);
  };

  const editHandle = e => {
    const editTodo = todo.map(todo => {
      if (Number(e.target.id) === todo.id) {
        todo.edit = !todo.edit;
        setInputOld(todo.content);
      }
      return todo;
    });
    setTodo(editTodo);
  };

  const confirmEdit = e => {
    const editTodo = todo.map(todo => {
      if (Number(e.target.id) === todo.id) {
        todo.edit = !todo.edit;
        todo.content = inputEdit ? inputEdit : inputOld;
      }
      console.log(todo);
      return todo;
    });
    setTodo(editTodo);
  };

  const checkHandle = e => {
    const checkedTodo = todo.map(todo => {
      if (Number(e.target.id) === todo.id) {
        todo.checked = !todo.checked;
      }
      return todo;
    });
    setTodo(checkedTodo);
  };

  const addHandler = e => {
    e.preventDefault();
    if (!inputNew) {
      return;
    } else {
      setAddTodo({
        id: Math.floor(Math.random() * 10000),
        filter: difficulty,
        checked: false,
        edit: false,
        content: inputNew
      });
    }
    e.target.parentElement.children[0].children[0].value = "";
    setInputNew(null);
  };

  const getData = e => {
    if (e.target.id === "todo--edit") {
      setInputEdit(inputOld ? inputOld + e.target.value : e.target.value);
      setInputOld();
    } else {
      setInputNew(e.target.value);
    }
  };

  const getDifficulty = e => {
    setDifficulty(e.target.value.toUpperCase());
  };

  useEffect(() => {
    if (!addTodo) {
      return;
    }
    setTodo([addTodo, ...todo]);
  }, [addTodo]);

  return (
    <div className="container__grid">
      <MellonTitle></MellonTitle>
      <TodoAdd
        addHandler={addHandler}
        getData={getData}
        getDifficulty={getDifficulty}
      ></TodoAdd>
      <Filter chosenFilter={filterHandle}></Filter>
      <Content>
        <Todos
          todo={todo}
          selectedFilter={filter}
          remove={removeHandle}
          editHandle={editHandle}
          confirmEdit={confirmEdit}
          checkHandle={checkHandle}
          getData={getData}
          inputOld={inputOld}
        ></Todos>
      </Content>
      <Footer></Footer>
    </div>
  );
};

export default App;
