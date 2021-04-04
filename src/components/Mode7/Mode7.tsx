import Mode7Controls from "./Mode7Controls";
import Mode7Canvas from "./Mode7Canvas";
import { useState } from "react";

const Mode7: React.FC = () => {

  const [state, setState] = useState({
    height: 300,
    width: 400,
    z: 60,
    scaleX: 16,
    scaleY: 16
  })

  return (
    <div id="Mode7">
      <Mode7Controls state={state} setState={setState}/>
      <Mode7Canvas state={state} setState={setState}/>
    </div>
  );
}

export default Mode7;