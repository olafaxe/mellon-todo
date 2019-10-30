import React from "react";

const TodoContent = ({ todoChecked, todoId, checkHandleFu, todoContent }) => {
  return (
    <>
      {!todoChecked ? (
        <p onClick={checkHandleFu} id={todoId}>
          {todoContent}
        </p>
      ) : (
        <s onClick={checkHandleFu} id={todoId}>
          {todoContent}
        </s>
      )}
    </>
  );
};

export default TodoContent;
