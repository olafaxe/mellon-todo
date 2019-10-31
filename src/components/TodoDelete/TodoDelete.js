import React from "react";
import Button from "../Misc/Button/Button";

import "./TodoDelete.scss";
const TodoDelete = ({ todoId, confirmingRemove }) => {
  return (
    <div className="todo--delete">
      <p>Delete?</p>
      <div className="todo--delete--btns">
        <Button
          btncls={"todo--delete--btn todo--delete--yes"}
          todoId={todoId}
          buttonAction={confirmingRemove}
          type={"YES"}
        />
        <Button
          btncls={"todo--delete--btn todo--delete--no"}
          todoId={todoId}
          buttonAction={confirmingRemove}
          type={"NO"}
        />
      </div>
    </div>
  );
};

export default TodoDelete;
