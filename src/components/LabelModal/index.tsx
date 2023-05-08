import { createPortal } from "react-dom";
import "./LabelModal.css";

export const LabelModal = ({ text = "modal" }) => {
  return createPortal(
    <div className='LabelModal'>
      <div className='bar'></div>
      <p className='text'>{text}</p>
    </div>,
    document.getElementById("modal") as HTMLDivElement
  );
};
