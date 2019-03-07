import React from "react";

const SideNote = ({ base, date, className }) => (
  <>
    <div className={className}>
      <span>
        Base Currency : <strong>{`${base}`}</strong>
      </span>
      <h3>
        Date : <span style={{ color: "green" }}>{` ${date}`}</span>
      </h3>
    </div>
  </>
);

export default SideNote;
