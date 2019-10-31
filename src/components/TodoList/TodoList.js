import React from "react";
import TodoItem from "../TodoItem/TodoItem";
const TodoList = ({
  todoList,
  switchingCompleteStatus,
  confirmingEdit,
  switchingEditingMode,
  getDataFromInput,
  confirmingRemove,
  switchingRemoveMode,
  inputEditSt
}) => {
  return (
    <>
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
            inputEditSt={inputEditSt}
          />
        );
      })}
    </>
  );
};

export default TodoList;
