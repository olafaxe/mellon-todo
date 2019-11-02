import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.scss";
const TodoList = ({
  todoList,
  switchingCompleteStatus,
  confirmingEdit,
  switchingEditingMode,
  getDataFromInput,
  confirmingRemove,
  switchingRemoveMode,
  inputFromEditing
}) => {
  return (
    <div className="container__todolist">
      {todoList.map(todo => {
        return (
          <TodoItem
            todoId={todo.id}
            key={todo.id.toString()}
            todoContent={todo.content}
            todoChecked={todo.checked}
            todoDelete={todo.delete}
            todoEdit={todo.edit}
            switchingCompleteStatus={switchingCompleteStatus}
            switchingEditingMode={switchingEditingMode}
            confirmingEdit={() => {
              confirmingEdit(todo.id);
            }}
            getDataFromInput={getDataFromInput}
            switchingRemoveMode={switchingRemoveMode}
            confirmingRemove={confirmingRemove}
            inputFromEditing={inputFromEditing}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
