export const UseRuleModal = () => {
  const handleOpenRules = () => {
    const modal = document.querySelector<HTMLDivElement>(".RulesScreen");

    if (!modal) {
      throw new Error("No se encontro el modal");
    }
    modal.setAttribute("class", "RulesScreen show");
  };

  const handleCloseRules = () => {
    const modal = document.querySelector(".RulesScreen");
    if (!modal) {
      throw new Error("No se encontro el modal");
    }
    modal.setAttribute("class", "RulesScreen");
  };
  return { handleOpenRules, handleCloseRules };
};
