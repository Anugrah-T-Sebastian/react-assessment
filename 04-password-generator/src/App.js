import { useState } from "react";
import usePasswordGenerator from "./hooks/use-password-generator";
import "./styles.css";

export default function App() {
  // HOOKS
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: true },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  // FUNCTION
  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  // RENDER
  return (
    <div className="container">
      {/* Password Text and Copy */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <button className="copyBtn" onClick={() => {}}>
            copy
          </button>
        </div>
      )}
      {/* Character length */}
      <div className="charlength">
        <span>
          <label>Character length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      {/* Checkboxes */}
      <div className="checkboxes">
        {checkboxData.map((checkbox, i) => {
          return (
            <div key={i}>
              <input
                type="checkbox"
                checked={checkbox.state}
                onChange={() => handleCheckboxChange(i)}
              />
              <label>{checkbox.title}</label>
            </div>
          );
        })}
      </div>
      {/* Strength */}
      {/* Generate Button */}
      <button
        className="generateBtn"
        onClick={() => generatePassword(checkboxData, length)}
      >
        Generate Password
      </button>
    </div>
  );
}
