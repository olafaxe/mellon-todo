import React from "react";

const TodoContent = ({
  todoChecked,
  todoId,
  switchingCompleteStatus,
  todoContent
}) => {
  return (
    <>
      {!todoChecked ? (
        <p onClick={switchingCompleteStatus} id={todoId}>
          {todoContent}
        </p>
      ) : (
        <s onClick={switchingCompleteStatus} id={todoId}>
          {todoContent}
        </s>
      )}
    </>
  );
};

export default TodoContent;
