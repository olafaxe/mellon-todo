import React from "react";
import Button from "../Misc/Button/Button";
import Input from "../Misc/Input/Input";
import Selector from "../Misc/Selector/Selector";
import "./TodoAdd.scss";

const TodoAdd = ({
  addTodoItem,
  getDataFromInput,
  getDataFromSelector,
  inputFromAdding,
  avaibleFilters
}) => {
  return (
    <div className="container__add">
      <div className="add--todo__container">
        <form>
          <Input
            label={"taskname"}
            id={"taskname"}
            getDataFromInput={getDataFromInput}
            def={inputFromAdding}
          />
          {avaibleFilters ? (
            <Selector
              label={"taskdiff"}
              id={"taskdiff"}
              getDataFromSelector={getDataFromSelector}
              avaibleFilters={avaibleFilters}
            />
          ) : null}

          <Button
            buttonAction={addTodoItem}
            type={"Seed"}
            btncls={"todo--add--btn"}
          />
        </form>
      </div>
    </div>
  );
};

export default TodoAdd;
