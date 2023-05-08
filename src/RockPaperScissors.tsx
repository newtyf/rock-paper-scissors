import { LabelModal, RulesModal } from "./components/";
import { UserProvider } from "./context/UserProvider";
import { AppRouter } from "./router/AppRouter";
import "./styles.css";

function RockPaperScissors() {
  return (
    <>
      <LabelModal />
      <UserProvider>
        <AppRouter />
      </UserProvider>
      <RulesModal />
    </>
  );
}

export default RockPaperScissors;
