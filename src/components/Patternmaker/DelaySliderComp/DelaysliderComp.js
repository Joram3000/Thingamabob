import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { seqSettingsDelayaction } from "../../../store/seqState/actions";

export default function DelaysliderComp() {
  const dispatch = useDispatch();
  const [delaydrywet, setDelaydrywet] = useState(0);

  useEffect(() => {
    dispatch(seqSettingsDelayaction(delaydrywet));
  }, [dispatch, delaydrywet]);

  return (
    <div id="delayDIV" className="slider-style">
      Delay <br></br>
      {delaydrywet}
      <div className="slidecontainer">
        <input
          type="range"
          min="0"
          max="0.5"
          value={delaydrywet}
          onChange={(e) => {
            setDelaydrywet(e.target.value);
          }}
          step="0.05"
        />
      </div>
    </div>
  );
}
