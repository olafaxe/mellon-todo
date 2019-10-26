import React from "react";
import Todo from "../Todo/Todo";
const TodoFilter = ({
  todo,
  checkHandleFu,
  editConfirmFu,
  editHandleFu,
  getDataFu,
  removeConfirmFu,
  removeHandleFu,
  editBarrierSt,
  inputOldSt,
  selectedFilterSt
}) => {
  return (
    <>
      {todo.map(todo => {
        if (selectedFilterSt === "ALL") {
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
        } else if (todo.filter === selectedFilterSt) {
          return (
            <Todo
              todoId={todo.id}
              key={todo.id.toString()}
              todoContent={todo.content}
              todoChecked={todo.checked}
              todoDelete={todo.delete}
              todoEdit={todo.edit}
              checkHandleFu={checkHandleFu}
              getDataFu={getDataFu}
              removeHandleFu={removeHandleFu}
              removeConfirmFu={removeConfirmFu}
              editHandleFu={editHandleFu}
              editConfirmFu={editConfirmFu}
              editBarrierSt={editBarrierSt}
              inputOldSt={inputOldSt}
            />
          );
        }
      })}
    </>
  );
};

export default TodoFilter;
