import React from "react";
import "./Todo.scss";
import { tsModuleDeclaration } from "@babel/types";

const Todo = ({ todo, selectedFilter }) => {
  console.log(todo);
  return (
    <>
      {todo.map(todo => {
        if (selectedFilter === "Alla") {
          return (
            <div className="container__todo" key={todo.id.toString()}>
              <h1>{todo.title}</h1>
              <p>{todo.content}</p>
            </div>
          );
        } else if (todo.filter === selectedFilter) {
          return (
            <div className="container__todo" key={todo.id.toString()}>
              <h1>{todo.title}</h1>
              <p>{todo.content}</p>
            </div>
          );
        }
      })}
    </>
  );
};

export default Todo;
