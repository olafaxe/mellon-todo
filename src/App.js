import React, { useState, useEffect } from "react";
import Content from "./components/Content/Content";
import TodoList from "./components/TodoList/TodoList";
import TodoFilter from "./components/TodoFilter/TodoFilter";
import TodoAdd from "./components/TodoAdd/TodoAdd";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import "./sass/Style.scss";
import "./sass/Grid.scss";

const App = () => {
  const [todo, setTodo] = useState([]);
  const [inputFromAdding, SetInputFromAdding] = useState("");
  const [inputFromEditing, setInputFromEditing] = useState("");
  const [todoDifficultySt, setTodoDifficultySt] = useState("EASY");
  const [selectedFilterSt, setSelectedFilterSt] = useState("ALL");
  const [avaibleFilters, setAvaibleFilters] = useState([
    { filter: "All" },
    { filter: "Easy" },
    { filter: "Hard" },
    { filter: "Completed" }
  ]);

  /// FILTERING TODO LIST
  const getFilter = e => {
    setSelectedFilterSt(e.toUpperCase());
  };

  const gettingTodoList = (todos, filter) => {
    if (filter === "ALL") {
      return todos.filter(todo => todo.filter !== "COMPLETED");
    }
    return todos.filter(todo => todo.filter === filter);
  };

  /// DELETING A TODO ITEM
  const switchingRemoveMode = e => {
    const deleteTodo = todo.map(todo => {
      if (Number(e.target.id) === todo.id) {
        todo.delete = !todo.delete;
        return todo;
      }
      return todo;
    });
    setTodo(deleteTodo);
  };

  const confirmingRemove = e => {
    if (e.target.innerText === "NO") {
      switchingRemoveMode(e);
      return;
    }
    const removedTodo = todo.filter(todo => Number(e.target.id) === todo.id);
    deletingData(`/todos/${removedTodo[0].id}`, "DELETE").then(data => {
      if (data) {
        const newTodos = todo.filter(todo => data !== todo.id);
        setTodo(newTodos);
      } else {
        console.log("Whoops! Someone done ola-coding!");
      }
    });
  };

  /// EDITING TODO ITEM
  const switchingEditingMode = e => {
    const editTodo = todo.map(todo => {
      if (Number(e.target.id) === todo.id) {
        todo.edit = !todo.edit;
        setInputFromEditing(todo.content);
        return todo;
      }
      return todo;
    });
    setTodo(editTodo);
  };

  const confirmingEdit = e => {
    let editedTodo;
    let newTodos = todo.map(todo => {
      if (Number(e) === todo.id) {
        todo.edit = !todo.edit;
        todo.content = inputFromEditing;
        todo.date = Date.now();
        editedTodo = todo;
        return todo;
      }
      return todo;
    });
    sendingData("/todos", "PATCH", editedTodo).then(data =>
      data ? setTodo(newTodos) : console.log("Whoops! Someone done ola-coding!")
    );
  };

  /// COMPLETING TODO ITEM
  const switchingCompleteStatus = e => {
    let checkedTodo;
    let newTodos = todo.map(todo => {
      if (Number(e.target.id) === todo.id) {
        todo.checked = !todo.checked;
        todo.filter = todo.filter !== "COMPLETED" ? "COMPLETED" : "ALL";
        checkedTodo = todo;
        return todo;
      }
      return todo;
    });
    sendingData("/todos", "PATCH", checkedTodo).then(data =>
      data ? setTodo(newTodos) : console.log("Whoops! Someone done ola-coding!")
    );
  };

  /// ADDING TODO ITEM
  const addTodoItem = e => {
    e.preventDefault();
    if (!inputFromAdding) {
      return;
    } else {
      let todoItem = {
        id: Math.floor(Math.random(36) * 100000000000),
        filter: todoDifficultySt,
        checked: false,
        edit: false,
        content: inputFromAdding,
        date: Date.now()
      };
      sendingData("/todos", "POST", todoItem).then(data =>
        data
          ? setTodo([data, ...todo])
          : console.log("Whoops! Someone done ola-coding!")
      );
    }
    SetInputFromAdding("");
  };

  /// GETTING DATA FROM INPUT FIELDS
  const getDataFromInput = e => {
    if (e.target.id === "todo--edit") {
      setInputFromEditing(e.target.value);
    } else {
      SetInputFromAdding(e.target.value);
    }
  };

  const choosingDifficulty = e => {
    setTodoDifficultySt(e.target.value.toUpperCase());
  };

  /// HTTP REQUESTS
  const gettingData = async url => {
    try {
      let res = await fetch(url);
      let data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const deletingData = async (url, method) => {
    try {
      let res = await fetch(url, {
        method: method
      });
      let data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const sendingData = async (url, method, body) => {
    let res = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });
    let data = await res.json();
    return data;
  };

  /// COMPONENT DID MOUNT
  useEffect(() => {
    gettingData("/todos").then(data =>
      data
        ? setTodo([...data])
        : console.log("Whoops! Someone done ola-coding!")
    );
  }, []);

  return (
    <div className="container__grid">
      <Header />
      <TodoAdd
        addTodoItem={addTodoItem}
        getDataFromInput={getDataFromInput}
        choosingDifficulty={choosingDifficulty}
        inputFromAdding={inputFromAdding}
      />
      <TodoFilter getFilter={getFilter} avaibleFilters={avaibleFilters} />
      <Content>
        <TodoList
          todoList={gettingTodoList(todo, selectedFilterSt)}
          switchingCompleteStatus={switchingCompleteStatus}
          confirmingEdit={confirmingEdit}
          switchingEditingMode={switchingEditingMode}
          getDataFromInput={getDataFromInput}
          confirmingRemove={confirmingRemove}
          switchingRemoveMode={switchingRemoveMode}
          inputFromEditing={inputFromEditing}
        />
      </Content>
      <Footer />
    </div>
  );
};

export default App;
