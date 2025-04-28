function SliderInput({}) {
  return (
    <React.Fragment>
      <span className="title">Down Payment</span>
      <span className="title">
        {" "}
        Total Down Payment -{" "}
        {numberWithCommas(
          (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
        )}
      </span>

      <div className="">
        <input
          type="range"
          min={0}
          max={cost}
          className="slider"
          value={downPayment}
          onChange={updateEMI}
        />
        <div className="labels">
          <label htmlFor="">0%</label>
          <b>{numberWithCommas(downPayment)}</b>
          <label htmlFor="">100%</label>
        </div>
      </div>
    </React.Fragment>
  );
}
