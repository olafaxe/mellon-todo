import React, { useState } from "react";

const Button = props => {
  return (
    <>
      <button onClick={props.clickTest}>Klicka på mig</button>
    </>
  );
};

export default Button;
