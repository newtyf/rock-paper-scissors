import "./GameSelection.css";

function GameSelection({
  shadowStyle,
  imageGameOption,
  colorGameOption,
  onClick,
}) {
  const styleSelection = {
    backgroundImage: `url(${imageGameOption})`,
    borderColor: `var(${colorGameOption})`,
  };

  return (
    <button
      onClick={onClick}
      className={`GameSelection ${shadowStyle ? "shadowSelect" : ""}`}
      style={styleSelection}
    ></button>
  );
}

export { GameSelection };
