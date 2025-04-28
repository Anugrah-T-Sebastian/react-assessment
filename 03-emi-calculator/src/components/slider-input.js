import React from "react";
import { numberWithCommas } from "../utils/config";

function SliderInput({
  title,
  underlineTitle,
  state,
  min,
  max,
  onChange,
  labelMin,
  labelMax,
}) {
  return (
    <React.Fragment>
      <span className="title">{title}</span>
      {state > 0 && (
        <span className="title" style={{ textDecoration: "underline" }}>
          {underlineTitle}
        </span>
      )}

      <div>
        <input
          type="range"
          min={0}
          max={max}
          className="slider"
          value={state}
          onChange={onChange}
        />
        <div className="labels">
          <label htmlFor="">{labelMin ?? numberWithCommas(min)}</label>
          <b>{numberWithCommas(state)}</b>
          <label htmlFor="">{labelMax ?? numberWithCommas(max)}</label>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SliderInput;
