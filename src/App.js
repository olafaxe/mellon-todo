import React, { useState, useEffect } from "react";
import Content from "./components/Content/Content";
import TodoFilter from "./components/TodoFilter/TodoFilter";
import Filter from "./components/Filter/Filter";
import TodoAdd from "./components/TodoAdd/TodoAdd";
import Title from "./components/Title/Title";
import Footer from "./components/Footer/Footer";

import "./sass/Style.scss";
import "./sass/Grid.scss";

const App = () => {
  const [todo, setTodo] = useState([
    // {
    //   id: 1,
    //   filter: "HARD",
    //   checked: false,
    //   edit: false,
    //   delete: false,
    //   content: "Be a good person"
    // },
    // {
    //   id: 2,
    //   filter: "HARD",
    //   checked: false,
    //   edit: false,
    //   delete: false,
    //   content: "Read something cool"
    // },
    // {
    //   id: 3,
    //   filter: "EASY",
    //   checked: false,
    //   edit: false,
    //   delete: false,
    //   content: "Think about Charlie"
    // },
    // {
    //   id: 4,
    //   filter: "HARD",
    //   checked: false,
    //   edit: false,
    //   delete: false,
    //   content: "Survive in A-team"
    // }
  ]);

  const [test, setTest] = useState([]);
  const [addTodoSt, setAddTodoSt] = useState();
  const [removedTodoSt, setRemovedTodoSt] = useState();
  const [editedTodoSt, setEditedTodoSt] = useState();
  const [inputNewSt, setInputNewSt] = useState();
  const [inputOldSt, setInputOldSt] = useState();
  const [inputEditSt, setInputEditSt] = useState();
  const [editBarrierSt, setEditBarrierSt] = useState(false);
  const [todoDifficultySt, setTodoDifficultySt] = useState("EASY");
  const [selectedFilterSt, setSelectedFilterSt] = useState("ALL");

  //*************** */
  //*********FILTER */
  //*************** */
  const filterHandleFu = e => {
    console.log(e);
    let upperFilter = e.target.value.toUpperCase();
    setSelectedFilterSt(upperFilter);
  };

  const filterTodoList = e => {
    const filterTodo = todo.filter(todo => todo.filter !== selectedFilterSt);
    return filterTodo;
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
        setInputEditSt(inputOldSt ? inputOldSt : todo.content);
        setInputOldSt(!inputOldSt ? todo.content : null);
        setEditBarrierSt(!editBarrierSt);
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
        todo.content = inputEditSt ? inputEditSt : inputOldSt;
        todo.date = Date.now();
        setEditedTodoSt(todo);
      }

      return todo;
    });
    setTodo(editTodo);
    setInputOldSt(null);
    setEditBarrierSt(!editBarrierSt);
  };

  //*************** */
  //*********CHECK */
  //*************** */
  const checkHandleFu = e => {
    const checkedTodo = todo.map(todo => {
      if (Number(e.target.id) === todo.id) {
        todo.checked = !todo.checked;
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
    }

    setTest([addTodoSt, ...todo]);

    console.log("test", test);
    console.log("todo:", todo);

    e.target.parentElement.parentElement.children[0].children[0].value = "";
    // setInputNewSt("");
  };

  //*************** */
  //*********DATA ***/
  //*************** */
  const getDataFu = e => {
    if (e.target.id === "todo--edit") {
      setInputEditSt(inputOldSt ? inputOldSt + e.target.value : e.target.value);
      setInputOldSt(null);
    } else {
      setInputNewSt(e.target.value);
    }
  };

  const getDifficultyFu = e => {
    setTodoDifficultySt(e.target.value.toUpperCase());
  };

  //*************** */
  //****USE EFFECTS */
  //*************** */
  // useEffect(() => {
  //   if (!addTodoSt) {
  //     return;
  //   }
  //   setTodo([addTodoSt, ...todo]);
  // }, [addTodoSt]);

  //*************** */
  //*** RETURN **** */

  const CrudFu = async (url, method, body) => {
    let response = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" } // *GET, POST, PUT, DELETE, etc.
    });
    let data = await response.json();
    if (method === "GET") {
      setTodo(prevState => {
        console.log("this is getting data", data);
        return [...data];
      });
    } else if (method === "POST") {
      console.log("this is adding data", data);
      return data;
    }
    console.log("this is add body", body);
  };

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
  }, [addTodoSt, removedTodoSt, editedTodoSt]);

  useEffect(() => {
    CrudFu("/api/getRequest", "GET");
  }, []);

  return (
    <div className="container__grid">
      <Title />
      <TodoAdd
        addHandleFu={addHandleFu}
        getDataFu={getDataFu}
        getDifficultyFu={getDifficultyFu}
        inputNewSt={inputNewSt}
      />
      <Filter filterHandleFu={filterHandleFu} />
      <Content>
        <TodoFilter
          filterTodoList={selectedFilterSt !== "ALL" ? filterTodoList() : todo}
          checkHandleFu={checkHandleFu}
          editConfirmFu={editConfirmFu}
          editHandleFu={editHandleFu}
          getDataFu={getDataFu}
          removeConfirmFu={removeConfirmFu}
          removeHandleFu={removeHandleFu}
          editBarrierSt={editBarrierSt}
          inputOldSt={inputOldSt}
        />
      </Content>
      <Footer />
    </div>
  );
};

export default App;

// fetch("/api/getRequest", {
//   method: "GET", // *GET, POST, PUT, DELETE, etc.
//   mode: "no-cors" // no-cors, *cors, same-origin
// })
//   .then(res => {
//     return res.json();
//   })
//   .then(data => {
//     // console.log(data);
//     // console.log(data);
//     setTodo(prevState => {
//       return [...data];
//     });
//   })
//   .catch(function(e) {
//     console.log(e);
//   });
