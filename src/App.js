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
  const filterHandleFu = e => {
    let upperFilter = e.target.textContent.toUpperCase();
    setSelectedFilterSt(upperFilter);
  };

  const filterTodoList = (todos, filter) => {
    if (filter === "ALL") {
      return todos.filter(todo => todo.filter !== "COMPLETED");
    }
    return todos.filter(todo => todo.filter === filter);
  };

  //*************** */
  //*********DELETE */
  //*************** */
  const removeHandleFu = e => {
    const deleteTodo = todo.map(todo => {
      if (Number(e.target.id) === todo.id) {
        todo.delete = !todo.delete;
        return todo;
      }
      return todo;
    });
    setTodo(deleteTodo);
  };

  const removeConfirmFu = e => {
    if (e.target.innerText === "NO") {
      removeHandleFu(e);
      return;
    }
    const newTodos = todo.filter(todo => Number(e.target.id) !== todo.id);
    const removedTodo = todo.filter(todo => Number(e.target.id) === todo.id);
    setRemovedTodoSt(removedTodo[0]);
    setTodo(newTodos);
  };

  //*************** */
  //*********EDIT ***/
  //*************** */
  const editHandleFu = e => {
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

  const editConfirmFu = e => {
    const editTodo = todo.map(todo => {
      if (Number(e.target.id) === todo.id) {
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
  const checkHandleFu = e => {
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
  const addHandleFu = e => {
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
  const getDataFu = e => {
    if (e.target.id === "todo--edit") {
      setInputEditSt(e.target.value);
    } else {
      setInputNewSt(e.target.value);
    }
  };

  const getDifficultyFu = e => {
    setTodoDifficultySt(e.target.value.toUpperCase());
  };

  const CrudFu = async (url, method, body) => {
    let response = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" } // *GET, POST, PUT, DELETE, etc.
    });
    let data = await response.json();
    if (method === "GET") {
      setTodo(prevState => {
        return [...data];
      });
    } else if (method === "POST") {
      return data;
    }
  };

  //*************** */
  //****USE EFFECTS */
  //*************** */

  useEffect(() => {
    if (addTodoSt) {
      CrudFu("/api/postRequest", "POST", addTodoSt);
      setTodo([addTodoSt, ...todo]);
      setAddTodoSt(null);
    } else if (removedTodoSt) {
      CrudFu("/api/deleteRequest", "DELETE", removedTodoSt);
      setRemovedTodoSt(null);
    } else if (editedTodoSt) {
      CrudFu("/api/patchRequest", "PATCH", editedTodoSt);
      setEditedTodoSt(null);
    }
  }, [todo, addTodoSt, removedTodoSt, editedTodoSt]);

  useEffect(() => {
    CrudFu("/api/getRequest", "GET");
  }, []);
  return (
    <div className="container__grid">
      <Header />
      <TodoAdd
        addHandleFu={addHandleFu}
        getDataFu={getDataFu}
        getDifficultyFu={getDifficultyFu}
        inputNewSt={inputNewSt}
      />
      <TodoFilter filterHandleFu={filterHandleFu} />
      <Content>
        <TodoList
          filterTodoList={filterTodoList(todo, selectedFilterSt)}
          checkHandleFu={checkHandleFu}
          editConfirmFu={editConfirmFu}
          editHandleFu={editHandleFu}
          getDataFu={getDataFu}
          removeConfirmFu={removeConfirmFu}
          removeHandleFu={removeHandleFu}
          inputEditSt={inputEditSt}
        />
      </Content>
      <Footer />
    </div>
  );
};

export default App;
