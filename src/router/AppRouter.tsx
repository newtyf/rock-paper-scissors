import { Route, Routes } from "react-router-dom";
import { GameLocal, GameOnline, Home } from "../pages";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/*' element={<Home />}></Route>
        <Route path='/local/*' element={<GameLocal />}></Route>
        <Route path='/online/*' element={<GameOnline />}></Route>
      </Routes>
    </>
  );
};
