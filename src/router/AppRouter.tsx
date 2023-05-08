import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { GameLocal } from "../pages/GameLocal";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/*' element={<Home />}></Route>
        <Route path='/local/*' element={<GameLocal />}></Route>
      </Routes>
    </>
  );
};
