import React, { useState } from "react";
import "./Grid.scss";
import Content from "./components/Content/Content";
import Todo from "./components/Todo/Todo";
import Filter from "./components/Filter/Filter";

function App() {
  const [todo, setTodo] = useState([
    {
      id: 1,
      title: "first",
      filter: "svår",
      content: "Eiusmod velit laboris ullamco proident duis."
    },
    {
      id: 2,
      title: "second",
      filter: "svår",
      content: "Ad laborum anim incididunt veniam nisi deserunt laborum ipsum."
    },
    {
      id: 3,
      title: "third",
      filter: "Lätt",
      content: "Magna ut veniam Lorem proident sunt amet."
    }
  ]);

  const [filter, setFilter] = useState("Alla");

  const filterHandle = e => {
    setFilter(e.target.value);
  };

  console.log(filter);

  return (
    <div className="App container__grid">
      <Content>
        <Filter chosenFilter={filterHandle}></Filter>
        <Todo todo={todo} selectedFilter={filter}></Todo>
      </Content>
    </div>
  );
}

export default App;
