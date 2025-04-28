import { useEffect, useState } from "react";
import TextInput from "./components/text-input";
import "./styles.css";
import { numberWithCommas } from "./utils/config";
import { tenureData } from "./utils/constants";

export default function App() {
  //HOOKS
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = calculateEMI(downPayment);
    setEmi(emi);
  }, [tenure]);

  //FUNCTIONS
  const updateEMI = (e) => {
    if (!cost) return;

    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    //Calculate EMI and update it
    const emi = calculateEMI(dp);
    setEmi(emi);
  };
  const updateDownPayment = (e) => {
    if (!cost) return;

    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));
    //Calculate downPayment and update it
    const dp = calculateDownPayment(emi);
    setDownPayment(dp);
  };
  const calculateEMI = (downPayment) => {
    if (!cost) return;
    const loanAmount = cost - downPayment;
    const rateOfInterest = interest / 100;
    const numOfYear = tenure / 12;

    const EMI =
      (loanAmount * rateOfInterest * (1 + rateOfInterest) ** numOfYear) /
      ((1 + rateOfInterest) ** numOfYear - 1);
    return Number(EMI / 12).toFixed(0);
  };

  const calculateDownPayment = (emi) => {
    if (!cost) return;
    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  //RENDER
  return (
    <div className="App">
      <span className="title" style={{ fontSize: 30, margin: 10 }}>
        EMI Calculator
      </span>

      <TextInput
        title={"Total Cost of Asset"}
        state={cost}
        setState={setCost}
      />
      <TextInput
        title={"Interest Rate (in %)"}
        state={interest}
        setState={setInterest}
      />
      <TextInput
        title={"Processing Fee (in %)"}
        state={fee}
        setState={setFee}
      />

      <span className="title">Loan per Month</span>
      <span className="title">
        {" "}
        Total Loan Amount - {numberWithCommas((emi * tenure).toFixed(0))}
      </span>
      <div className="">
        <input
          type="range"
          min={calculateEMI(cost)}
          max={calculateEMI(0)}
          className="slider"
          value={emi}
          onChange={updateDownPayment}
        />
        <div className="labels">
          <label htmlFor="">{numberWithCommas(calculateEMI(cost))}</label>
          <b>{numberWithCommas(emi)}</b>
          <label htmlFor="">{numberWithCommas(calculateEMI(0))}</label>
        </div>
      </div>

      <div className="">
        <span className="title">Tenure</span>
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

      <span className="title">
        <div className="tenureContainer">
          {tenureData.map((t) => {
            console.log(t);
            return (
              <button
                key={t}
                className={`tenure ${t == tenure ? "selected" : ""}`}
                onClick={() => setTenure(t)}
              >
                {t}
              </button>
            );
          })}
        </div>
      </span>
    </div>
  );
}
