import React from "react";
import Todo from "../Todo/Todo";
const TodoList = ({
  filterTodoList,
  checkHandleFu,
  editConfirmFu,
  editHandleFu,
  getDataFu,
  removeConfirmFu,
  removeHandleFu,
  inputEditSt
}) => {
  return (
    <>
      {filterTodoList.map(todo => {
        return (
          <Todo
            todoId={todo.id}
            key={todo.id.toString()}
            todoContent={todo.content}
            todoChecked={todo.checked}
            todoDelete={todo.delete}
            todoEdit={todo.edit}
            checkHandleFu={checkHandleFu}
            editHandleFu={editHandleFu}
            editConfirmFu={editConfirmFu}
            getDataFu={getDataFu}
            removeHandleFu={removeHandleFu}
            removeConfirmFu={removeConfirmFu}
            inputEditSt={inputEditSt}
          />
        );
      })}
    </>
  );
};

export default TodoList;
