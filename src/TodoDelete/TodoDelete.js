import React from "react";
import Button from "../components/Misc/Button/Button";

const TodoDelete = ({ todoId, removeConfirmFu }) => {
  return (
    <div className="todo--delete">
      <p>Delete?</p>
      <div>
        <Button
          btncls={"delete"}
          todoId={todoId}
          handlerFu={removeConfirmFu}
          type={"YES"}
        />
        <Button
          btncls={"delete"}
          todoId={todoId}
          handlerFu={removeConfirmFu}
          type={"NO"}
        />
      </div>
    </div>
  );
};

export default TodoDelete;
