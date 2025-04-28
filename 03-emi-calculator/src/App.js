import { useEffect, useState } from "react";
import TextInput from "./components/text-input";
import SliderInput from "./components/slider-input";
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
  }, [tenure, cost]);

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

  const totalDownPayment = () => {
    return numberWithCommas(
      (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
    );
  };

  const totalEMI = () => {
    return numberWithCommas((emi * tenure).toFixed(0));
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

      {/* SLIDER INPUTS */}
      <SliderInput
        title="Down Payment"
        underlineTitle={`Total Down Payment - ${totalDownPayment()}`}
        state={downPayment}
        onChange={updateEMI}
        min={0}
        max={cost}
        labelMin={"0%"}
        labelMax={"100%"}
      />
      <SliderInput
        title="Loan per Month"
        underlineTitle={`Total Loan Amount - ${totalEMI()}`}
        state={emi}
        onChange={updateDownPayment}
        min={calculateEMI(cost)}
        max={calculateEMI(0)}
      />
      {/* END SLIDER INPUTS */}

      <div>
        <span className="title">Tenure</span>
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
    </div>
  );
}
