import React from "react";
import Button from "../Misc/Button/Button";
import Input from "../Misc/Input/Input";
import Selector from "../Misc/Selector/Selector";
import "./TodoAdd.scss";

const TodoAdd = ({ addHandleFu, getDataFu, getDifficultyFu, inputNewSt }) => {
  return (
    <div className="container__add">
      <div className="add--todo__container">
        <form>
          <Input
            label={"taskname"}
            id={"taskname"}
            getDataFu={getDataFu}
            def={inputNewSt}
          />
          <Selector
            label={"taskdiff"}
            id={"taskdiff"}
            getDifficultyFu={getDifficultyFu}
          />
          <Button
            handlerFu={addHandleFu}
            type={"Seed"}
            btncls={"todo--add--btn"}
          />
        </form>
      </div>
    </div>
  );
};

export default TodoAdd;
