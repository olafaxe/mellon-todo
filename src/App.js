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
  const [addTodoSt, setAddTodoSt] = useState();
  const [removedTodoSt, setRemovedTodoSt] = useState();
  const [editedTodoSt, setEditedTodoSt] = useState();
  const [inputNewSt, setInputNewSt] = useState("");
  const [inputEditSt, setInputEditSt] = useState("");
  const [todoDifficultySt, setTodoDifficultySt] = useState("EASY");
  const [selectedFilterSt, setSelectedFilterSt] = useState("ALL");

  //*************** */
  //*********FILTER */
  //*************** */
  const getFilter = e => {
    setSelectedFilterSt(e.target.textContent.toUpperCase());
  };

  const filteringTodoList = (todos, filter) => {
    if (filter === "ALL") {
      return todos.filter(todo => todo.filter !== "COMPLETED");
    }
    return todos.filter(todo => todo.filter === filter);
  };

  //*************** */
  //*********DELETE */
  //*************** */
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
    setRemovedTodoSt(removedTodo[0].id);
  };

  //*************** */
  //*********EDIT ***/
  //*************** */
  const switchingEditingMode = e => {
    const editTodo = todo.map(todo => {
      if (Number(e.target.id) === todo.id) {
        todo.edit = !todo.edit;
        setInputEditSt(todo.content);
        return todo;
      }
      return todo;
    });
    setTodo(editTodo);
  };

  const confirmingEdit = e => {
    const editTodo = todo.map(todo => {
      if (Number(e) === todo.id) {
        todo.edit = !todo.edit;
        todo.content = inputEditSt;
        todo.date = Date.now();
        setEditedTodoSt(todo);
      }

      return todo;
    });
    setTodo(editTodo);
  };

  //*************** */
  //*********CHECK */
  //*************** */
  const switchingCompleteStatus = e => {
    const checkedTodo = todo.map(todo => {
      if (Number(e.target.id) === todo.id) {
        todo.checked = !todo.checked;
        todo.filter = todo.filter !== "COMPLETED" ? "COMPLETED" : "ALL";
        setEditedTodoSt(todo);
      }
      return todo;
    });
    setTodo(checkedTodo);
  };

  //*************** */
  //*********ADDING */
  //*************** */
  const addTodoItem = e => {
    e.preventDefault();
    if (!inputNewSt) {
      return;
    } else {
      setAddTodoSt({
        id: Math.floor(Math.random(36) * 100000000000),
        filter: todoDifficultySt,
        checked: false,
        edit: false,
        content: inputNewSt,
        date: Date.now()
      });
      setInputNewSt("");
    }
  };

  //*************** */
  //*********DATA ***/
  //*************** */
  const getDataFromInput = e => {
    if (e.target.id === "todo--edit") {
      setInputEditSt(e.target.value);
    } else {
      setInputNewSt(e.target.value);
    }
  };

  const choosingDifficulty = e => {
    setTodoDifficultySt(e.target.value.toUpperCase());
  };

  const CRUDoperation = async (url, method, body) => {
    try {
      let response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      });
      let data = await response.json();
      return data;
    } catch (e) {
      console.log("hej:", e);
    }
  };

  //*************** */
  //****USE EFFECTS */
  //*************** */

  useEffect(() => {
    if (addTodoSt) {
      CRUDoperation("/todos", "POST", addTodoSt).then(data => {
        if (data) {
          setTodo([data, ...todo]);
        }
      });
      setAddTodoSt(null);
    } else if (removedTodoSt) {
      CRUDoperation(`/todos/${removedTodoSt}`, "DELETE").then(data => {
        if (data) {
          const newTodos = todo.filter(todo => data !== todo.id);
          setTodo(newTodos);
        }
      });
      setRemovedTodoSt(null);
    } else if (editedTodoSt) {
      CRUDoperation("/todos", "PATCH", editedTodoSt);
      setEditedTodoSt(null);
    }
  }, [todo, addTodoSt, removedTodoSt, editedTodoSt]);

  useEffect(() => {
    CRUDoperation("/todos", "GET").then(data => setTodo([...data]));
  }, []);

  return (
    <div className="container__grid">
      <Header />
      <TodoAdd
        addTodoItem={addTodoItem}
        getDataFromInput={getDataFromInput}
        choosingDifficulty={choosingDifficulty}
        inputNewSt={inputNewSt}
      />
      <TodoFilter getFilter={getFilter} />
      <Content>
        <TodoList
          todoList={filteringTodoList(todo, selectedFilterSt)}
          switchingCompleteStatus={switchingCompleteStatus}
          confirmingEdit={confirmingEdit}
          switchingEditingMode={switchingEditingMode}
          getDataFromInput={getDataFromInput}
          confirmingRemove={confirmingRemove}
          switchingRemoveMode={switchingRemoveMode}
          inputEditSt={inputEditSt}
        />
      </Content>
      <Footer />
    </div>
  );
};

export default App;
