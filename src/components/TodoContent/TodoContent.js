import React from "react";

const TodoContent = ({
  todoChecked,
  todoId,
  settingTodoToChecked,
  todoContent
}) => {
  return (
    <>
      {!todoChecked ? (
        <p onClick={settingTodoToChecked} id={todoId}>
          {todoContent}
        </p>
      ) : (
        <s onClick={settingTodoToChecked} id={todoId}>
          {todoContent}
        </s>
      )}
    </>
  );
};

export default TodoContent;
