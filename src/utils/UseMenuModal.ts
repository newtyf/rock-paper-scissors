import { ColorLabel, UseLabelModal } from "./UseLabelModal";

export const UseMenuModal = () => {
  const { showModal } = UseLabelModal();
  const showMenuModal = () => {
    const modal = document.querySelector(".menuModal") as HTMLDivElement;
    modal.style.display = "flex";
  };

  const closeMenuModal = () => {
    const modal = document.querySelector(".menuModal") as HTMLDivElement;
    modal.style.display = "none";
  };

  const copyCode = () => {
    const paragraph = document.querySelector(
      ".codeToFriend .code p"
    ) as HTMLParagraphElement;
    const text = paragraph.textContent;
    if (!text) {
      throw new Error("No se encontro el texto");
    }
    navigator.clipboard.writeText(text).then(() => {
      showModal("se copio el codigo", ColorLabel.SUCCESS);
    });
  };
  return { showMenuModal, closeMenuModal, copyCode };
};
