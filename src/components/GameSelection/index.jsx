import "./GameSelection.css";

function GameSelection({
  shadowStyle,
  animateStyle,
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
      className={`GameSelection ${shadowStyle ? "shadowSelect" : ""} ${animateStyle ? "animate" : ""}`}
      style={styleSelection}
    ></button>
  );
}

export { GameSelection };
