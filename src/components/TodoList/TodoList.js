import React from "react";
import Todo from "../Todo/Todo";
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
          <Todo
            todoId={todo.id}
            key={todo.id.toString()}
            todoContent={todo.content}
            todoChecked={todo.checked}
            todoDelete={todo.delete}
            todoEdit={todo.edit}
            switchingCompleteStatus={switchingCompleteStatus}
            switchingEditingMode={switchingEditingMode}
            confirmingEdit={confirmingEdit}
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
