import "./styles.css";
import { useEffect, useState } from "react";
import { SemiCircleMeter } from "./SemiCircleMeter";

// export default function App() {
//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//     </div>
//   );
// }

export default function App() {
  const [meterValue, setMeterValue] = useState(0);

  useEffect(() => {
    // 例: 3秒後に値を75にする
    const timer = setTimeout(() => {
      setMeterValue(75);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2>SemiCircleMeter</h2>
      <SemiCircleMeter value={meterValue} />
      <button onClick={() => setMeterValue(Math.random() * 100)}>
        Change Value
      </button>
    </div>
  );
}
