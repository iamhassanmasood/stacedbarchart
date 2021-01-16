import { useState, Fragment } from "react";
import "./App.css";
import StackedBarChart from "./components/stackbarchart";

const data = [
  {
    month: "jan20",
    "Series1": 25,
    "Series2": 15,
    "Series3": 10
  },
  {
    month: "Feb20",
    Series1: 15,
    Series2: 20,
    Series3: 25
  },
  {
    month: "Mar20",
    Series1: 25,
    Series2: 30,
    Series3: 15
  },
  {
    month: "Apr20",
    Series1: 15,
    Series2: 20,
    Series3: 25
  },
  {
    month: "May20",
    Series1: 50,
    Series2: 20,
    Series3: 25
  }
];

const allKeys = ["Series1", "Series2", "Series3"];

const colors = {
  Series1: "#e3495b",
  Series2: "#2295c9",
  Series3: "#3f9157"
};

function App() {
  const [keys, setKeys] = useState(allKeys);
  return (
    <Fragment>
      <StackedBarChart data={data} keys={keys} colors={colors} />

      <div className="fields">
        {allKeys.map(key => (
          <div key={key} className="field">
            <input
              id={key}
              type="checkbox"
              checked={keys.includes(key)}
              onChange={e => {
                if (e.target.checked) {
                  setKeys(Array.from(new Set([...keys, key])));
                } else {
                  setKeys(keys.filter(_key => _key !== key));
                }
              }}
            />
            <label htmlFor={key} style={{ color: colors[key] }}>
              {key}
            </label>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default App;
