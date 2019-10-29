import React from "react";
import Todo from "../Todo/Todo";
const TodoFilter = ({
  filterTodoList,
  checkHandleFu,
  editConfirmFu,
  editHandleFu,
  getDataFu,
  removeConfirmFu,
  removeHandleFu,
  editBarrierSt,
  inputOldSt
}) => {
  console.log(filterTodoList);
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
            editBarrierSt={editBarrierSt}
            inputOldSt={inputOldSt}
          />
        );
      })}
    </>
  );
};

export default TodoFilter;
