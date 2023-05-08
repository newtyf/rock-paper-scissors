import { options } from "../../helpers/getGameOptions";
import { TPick } from "../../types/User";
import "./GameSelection.css";

function GameOption(props: {
  shadowStyle?: boolean;
  animateStyle?: boolean;
  option: TPick;
  handle?: (pick: TPick) => void;
}) {
  const { shadowStyle, animateStyle, handle, option } = props;

  const styleSelection = {
    backgroundImage: `url(${options[option as keyof typeof options].img})`,
    borderColor: `var(${options[option as keyof typeof options].color})`,
  };

  return (
    <button
      onClick={!!handle ? () => handle(option) : () => {}}
      className={`GameSelection ${shadowStyle ? "shadowSelect" : ""} ${
        animateStyle ? "animate" : ""
      }`}
      style={styleSelection}
    ></button>
  );
}

export { GameOption };
