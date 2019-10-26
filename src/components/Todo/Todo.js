import React from "react";
import Input from "../Misc/Input/Input";
import "./Todo.scss";

import Button from "../Misc/Button/Button";

const Todo = ({
  todoId,
  todoContent,
  todoChecked,
  todoDelete,
  todoEdit,
  checkHandleFu,
  getDataFu,
  removeHandleFu,
  removeConfirmFu,
  editHandleFu,
  editConfirmFu,
  editBarrierSt,
  inputOldSt
}) => {
  // console.log(todoDelete);
  return (
    <div className="container__todo" key={todoId.toString()} id={todoId}>
      {todoDelete ? (
        <div className="todo--delete">
          <p>Delete?</p>
          <div>
            <Button todoId={todoId} handlerFu={removeConfirmFu} type={"YES"} />
            <Button todoId={todoId} handlerFu={removeConfirmFu} type={"NO"} />
          </div>
        </div>
      ) : (
        <>
          {" "}
          <div className="todo--content">
            {todoEdit ? (
              <Input
                label={"todo--edit"}
                id={"todo--edit"}
                getDataFu={getDataFu}
                def={inputOldSt}
              />
            ) : !todoChecked ? (
              <p onClick={checkHandleFu} id={todoId}>
                {todoContent}
              </p>
            ) : (
              <s onClick={checkHandleFu} id={todoId}>
                {todoContent}
              </s>
            )}
          </div>
          <div className="todo--icons">
            {todoEdit ? (
              <i
                onClick={editConfirmFu}
                id={todoId}
                className="far fa-check-circle"
              ></i>
            ) : (
              <i
                onClick={!editBarrierSt ? editHandleFu : null}
                id={todoId}
                className="fas fa-edit"
              ></i>
            )}
            <i
              onClick={removeHandleFu}
              id={todoId}
              className="fas fa-trash"
            ></i>
          </div>
        </>
      )}
    </div>
  );
};

export default Todo;
