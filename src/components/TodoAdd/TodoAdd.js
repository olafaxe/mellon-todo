import React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Selector from "../Selector/Selector";
import "./TodoAdd.scss";

const TodoAdd = ({ addHandler, getData, getDifficulty, inputNew }) => {
  return (
    <div className="container__add">
      <div className="add--todo__container">
        <form>
          <Input
            label={"taskname"}
            id={"taskname"}
            type={"text"}
            getData={getData}
            def={inputNew}
          ></Input>
          <Selector
            label={"taskdiff"}
            id={"taskdiff"}
            getDifficulty={getDifficulty}
          ></Selector>
          <Button addHandler={addHandler} type={"Seed"}></Button>
        </form>
      </div>
    </div>
  );
};

export default TodoAdd;
