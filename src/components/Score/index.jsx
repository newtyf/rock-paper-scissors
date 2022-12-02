import React from "react";
import "./Score.css"

const Score = ({points}) => {
  return (
    <div className="Score">
      <span>score</span>
      <p>{points}</p>
    </div>
  )
}

export { Score };
