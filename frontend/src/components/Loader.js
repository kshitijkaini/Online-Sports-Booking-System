import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Loader() {
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="sweet-loading text-center">
        <ClipLoader
          cssOverride=""
          size={60}
          color="#000"
          loading={true}
          speedMultiplier={1.5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
