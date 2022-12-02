import { createPortal } from "react-dom";
import "./RulesScreen.css";
import rulesImage from "../../assets/images/image-rules.svg";
import rulesClose from "../../assets/images/icon-close.svg";

function RulesScreen({closeRules}) {
  return createPortal(
    <div className="RulesScreen">
      <h1>RULES</h1>
      <img src={rulesImage} />
      <button className="close-rules" onClick={closeRules}>
        <img src={rulesClose} />
      </button>
    </div>,
    document.getElementById("rules")
  );
}

export { RulesScreen };
