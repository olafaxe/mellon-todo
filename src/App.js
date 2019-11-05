import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList/TodoList";
import TodoFilter from "./components/TodoFilter/TodoFilter";
import TodoAdd from "./components/TodoAdd/TodoAdd";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import "./sass/Style.scss";
import "./sass/Grid.scss";

const App = () => {
  const [avaibleTodos, setAvaibleTodos] = useState(null);
  const [avaibleFilters, setAvaibleFilters] = useState(null);
  const [inputFromAdding, SetInputFromAdding] = useState("");
  const [inputFromEditing, setInputFromEditing] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Easy");

  /// FILTERING TODO LIST
  const getFilter = item => {
    const newFilters = avaibleFilters.map(filter => {
      filter.status = false;
      if (item.filter === filter.filter) {
        filter.status = !filter.status;
      }
      return filter;
    });
    setAvaibleFilters(newFilters);
  };

  const gettingTodoList = todos => {
    let currentFilter = avaibleFilters.filter(item => item.status === true);
    if (currentFilter[0].filter === "All") {
      return todos.filter(todo => todo.checked !== true);
    }
    if (currentFilter[0].filter === "Completed") {
      return todos.filter(todo => todo.checked === true);
    }
    return todos.filter(
      todo => todo.filter === currentFilter[0].filter && todo.checked !== true
    );
  };

  /// DELETING A TODO ITEM
  const switchingRemoveMode = e => {
    const deleteTodo = avaibleTodos.map(todo => {
      if (Number(e.target.id) === todo.id) {
        todo.delete = !todo.delete;
        return todo;
      }
      return todo;
    });
    setAvaibleTodos(deleteTodo);
  };

  const confirmingRemove = e => {
    if (e.target.innerText === "NO") {
      switchingRemoveMode(e);
      return;
    }
    const removedTodo = avaibleTodos.filter(
      todo => Number(e.target.id) === todo.id
    );
    deletingData(`/todos/${removedTodo[0].id}`).then(data => {
      if (data) {
        const newTodos = avaibleTodos.filter(todo => data !== todo.id);
        setAvaibleTodos(newTodos);
      } else {
        console.log("Whoops! Someone done ola-coding!");
      }
    });
  };

  /// EDITING TODO ITEM
  const switchingEditingMode = e => {
    if (isEditing) {
      return;
    }
    setIsEditing(true);
    const editTodo = avaibleTodos.map(todo => {
      if (Number(e.target.id) === todo.id) {
        todo.edit = !todo.edit;
        setInputFromEditing(todo.content);
        return todo;
      }
      return todo;
    });
    setAvaibleTodos(editTodo);
  };

  const confirmingEdit = e => {
    setIsEditing(false);
    let editedTodo;
    let newTodos = avaibleTodos.map(todo => {
      if (Number(e) === todo.id) {
        todo.edit = !todo.edit;
        todo.content = inputFromEditing;
        todo.date = Date.now();
        editedTodo = todo;
        return todo;
      }
      return todo;
    });
    sendingData(`/todos/${editedTodo.id}`, "PUT", editedTodo).then(data =>
      data
        ? setAvaibleTodos(newTodos)
        : console.log("Whoops! Someone done ola-coding!")
    );
  };

  // COMPLETING TODO ITEM
  const settingTodoToChecked = e => {
    let checkedTodo;
    let newTodos = avaibleTodos.map(todo => {
      if (Number(e.target.id) === todo.id) {
        todo.checked = !todo.checked;
        checkedTodo = todo;
        return todo;
      }
      return todo;
    });
    sendingData(`/todos/${checkedTodo.id}`, "PATCH", checkedTodo).then(data =>
      data !== null
        ? setAvaibleTodos(newTodos)
        : console.log("Whoops! Someone done ola-coding!")
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
        filter: selectedFilter,
        checked: false,
        edit: false,
        content: inputFromAdding,
        date: Date.now()
      };
      sendingData("/todos", "POST", todoItem).then(data =>
        data
          ? setAvaibleTodos([data, ...avaibleTodos])
          : console.log("Whoops! Someone done ola-coding!")
      );
    }
    SetInputFromAdding("");
  };

  /// GETTING DATA FROM INPUT FIELDS
  const getDataFromInput = e => {
    if (e.target.id === "todo--edit") {
      setInputFromEditing(e.target.value);
    }
    if (e.target.id === "taskname") {
      SetInputFromAdding(e.target.value);
    }
  };

  const getDataFromSelector = e => {
    setSelectedFilter(e.target.value);
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

  const deletingData = async url => {
    try {
      let res = await fetch(url, {
        method: "DELETE"
      });
      let data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const sendingData = async (url, method, body) => {
    try {
      let res = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      });
      let data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  /// COMPONENT DID MOUNT
  useEffect(() => {
    gettingData("/filters")
      .then(data => {
        if (data) {
          setAvaibleFilters([...data]);
          return "OK";
        } else {
          return null;
        }
      })
      .then(res => {
        !res
          ? console.log("ERROR getting filter data! Aborting...")
          : gettingData("/todos").then(data =>
              data
                ? setAvaibleTodos([...data])
                : console.log("ERROR getting todo data! Aborting...")
            );
      });
  }, []);

  // console.log(avaibleFilters);
  // console.log(avaibleTodos);
  return (
    <div className="container__grid">
      <Header />
      <TodoAdd
        addTodoItem={addTodoItem}
        getDataFromInput={getDataFromInput}
        getDataFromSelector={getDataFromSelector}
        inputFromAdding={inputFromAdding}
        avaibleFilters={avaibleFilters}
      />
      {avaibleFilters ? (
        <TodoFilter
          getFilter={getFilter}
          avaibleFilters={avaibleFilters}
          getDataFromInput={getDataFromInput}
        />
      ) : null}

      {avaibleTodos ? (
        <TodoList
          todoList={gettingTodoList(avaibleTodos)}
          settingTodoToChecked={settingTodoToChecked}
          confirmingEdit={confirmingEdit}
          confirmingRemove={confirmingRemove}
          switchingEditingMode={switchingEditingMode}
          switchingRemoveMode={switchingRemoveMode}
          getDataFromInput={getDataFromInput}
          inputFromEditing={inputFromEditing}
        />
      ) : null}
      <Footer />
    </div>
  );
};

export default App;
