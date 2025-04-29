import "./styles.css";

export default function App() {
  // HOOKS
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  // RENDER
  return (
    <div className="container">
      {/* Password Text and Copy */}
      <div className="header">
        <div className="title">Hjsddas</div>
        <button className="copyBtn" onClick={() => {}}></button>
      </div>
      {/* Character length */}
      <div className="charlength">
        <span>
          <label>Character length</label>
          <label>4</label>
        </span>
        <input type="range" min="4" max="20" onChange={() => {}} />
      </div>
      {/* Checkboxes */}
      <div className="checkboxes">
        {checkboxData.map((checkbox, i) => {
          return (
            <div key={i}>
              <input type="checkbox" checked={checkbox.state} />
              <label>{checkbox.title}</label>
            </div>
          );
        })}
      </div>
      {/* Strength */}
      {/* Generate Button */}
      <button className="generateBtn" onChange={() => {}}>
        Generate Password
      </button>
    </div>
  );
}
