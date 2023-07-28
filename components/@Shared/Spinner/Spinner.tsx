"use client";

import { ProgressBar } from "react-loader-spinner";

function Spinner() {
  return (
    <div className="spinner-wrap">
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#F4442E"
        barColor="#51E5FF"
      />
    </div>
  );
}

export default Spinner;
