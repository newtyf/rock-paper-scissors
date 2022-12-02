import "./RulesButton.css"

function RulesButton({openRules}) {
  return (
    <button className="RulesButton" onClick={openRules}>
      RULES
    </button>
  );
}

export { RulesButton };