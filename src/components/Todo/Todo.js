import React from "react";
import Input from "../Input/Input";
import "./Todo.scss";

const Todo = ({
  remove,
  editHandle,
  canEdit,
  confirmEdit,
  checkHandle,
  checkValue,
  ki,
  id,
  content,
  getData,
  inputOld,
  wall
}) => {
  return (
    <div className="container__todo" key={ki} id={id}>
      <div className="todo--content">
        {canEdit ? (
          <Input
            label={"todo--edit"}
            id={"todo--edit"}
            getData={getData}
            def={inputOld}
          ></Input>
        ) : !checkValue ? (
          <p onClick={checkHandle} id={id}>
            {content}
          </p>
        ) : (
          <s onClick={checkHandle} id={id}>
            {content}
          </s>
        )}
      </div>

      <div className="todo--icons">
        {canEdit ? (
          <i onClick={confirmEdit} id={id} className="far fa-check-circle"></i>
        ) : (
          <i
            onClick={!wall ? editHandle : null}
            id={id}
            className="fas fa-edit"
          ></i>
        )}
        <i onClick={remove} id={id} className="fas fa-trash"></i>
      </div>
    </div>
  );
};

export default Todo;
