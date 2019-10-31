import React from "react";
import Input from "../Misc/Input/Input";
import "./TodoItem.scss";

import TodoDelete from "../TodoDelete/TodoDelete";
import TodoEdit from "../TodoEdit/TodoEdit";
import TodoContent from "../TodoContent/TodoContent";

const Todo = ({
  todoId,
  todoContent,
  todoChecked,
  todoDelete,
  todoEdit,
  switchingCompleteStatus,
  getDataFromInput,
  switchingRemoveMode,
  confirmingRemove,
  switchingEditingMode,
  confirmingEdit,
  inputEditSt
}) => {
  return (
    <div className="container__todo" key={todoId.toString()} id={todoId}>
      {todoDelete ? (
        <TodoDelete todoId={todoId} confirmingRemove={confirmingRemove} />
      ) : null}
      <div className="todo--content">
        {todoEdit ? (
          <Input
            label={"todo--edit"}
            id={"todo--edit"}
            getDataFromInput={getDataFromInput}
            def={inputEditSt}
          />
        ) : (
          <TodoContent
            todoChecked={todoChecked}
            todoId={todoId}
            switchingCompleteStatus={switchingCompleteStatus}
            todoContent={todoContent}
          />
        )}
      </div>
      <div className="todo--icons">
        <TodoEdit
          todoid={todoId}
          editFunction={!todoEdit ? switchingEditingMode : confirmingEdit}
          stylingClass={!todoEdit ? "fas fa-edit" : "far fa-check-circle"}
        />
        <i
          onClick={switchingRemoveMode}
          id={todoId}
          className="fas fa-trash"
        ></i>
      </div>
    </div>
  );
};

export default Todo;
