import { createPortal } from "react-dom";

import { UseRuleModal } from "../../utils/UseRuleModal";
import "./RulesScreen.css";

function RulesModal() {
  const { handleCloseRules } = UseRuleModal();

  return createPortal(
    <div className='RulesScreen'>
      <h1>RULES</h1>
      <img src="/images/image-rules.svg" />
      <button className='close-rules' onClick={handleCloseRules}>
        <img src="/images/icon-close.svg" />
      </button>
    </div>,
    document.getElementById("rules") as HTMLDivElement
  );
}

export { RulesModal };
