export enum ColorLabel {
  ALERT = "#dc2e4e",
  SUCCESS = "#2ecc71"
}

export const UseLabelModal = () => {
  const closeModal = () => {
    const modal = document.querySelector<HTMLDivElement>(".LabelModal");

    if (modal) {
      modal.style.right = "-300px";
    } else {
      throw new Error("No se encontro el modal");
    }
  };

  const showModal = (text: string, color: ColorLabel = ColorLabel.ALERT) => {
    const modal = document.querySelector<HTMLDivElement>(".LabelModal");
    if (modal) {
      const modalBar = document.querySelector(
        ".LabelModal .bar"
      ) as HTMLDivElement;
      const modalP = document.querySelector(
        ".LabelModal .text"
      ) as HTMLParagraphElement;

      modal.style.right = "5px";
      modalBar.style.backgroundColor = color;
      modalP.innerText = text;

      setTimeout(() => {
        closeModal();
      }, 2000);
    } else {
      throw new Error("No se encontro el modal");
    }
  };

  return { showModal, closeModal };
};
