import React from "react";

function RadioButtonGroup(props) {
  return (
    <div>
      <label>
        <input
          type="radio"
          value="option1"
          onChange={props.handleChange}
          className="mx-2"
        />
        &lt; 100 $
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="option2"
          checked={props.selectedOption === "option2"}
          onChange={props.handleChange}
          className="mx-2"
        />
        101 - 200 $
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="option3"
          checked={props.selectedOption === "option3"}
          onChange={props.handleChange}
          className="mx-2"
        />
        201 - 300 $
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="option4"
          checked={props.selectedOption === "option4"}
          onChange={props.handleChange}
          className="mx-2"
        />
        &gt; 300 $
      </label>
    </div>
  );
}

export default RadioButtonGroup;
