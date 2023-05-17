import { useContext } from "react";

import { createPortal } from "react-dom";
import "./MenuModal.css";
import { AppContext } from "../../types";
import { UseMenuModal } from "../../utils/UseMenuModal";
import { UserContext } from "../../context/UserContext";

export const MenuModal = () => {
  const { closeMenuModal, copyCode } = UseMenuModal();
  const { user, enemy, room } = useContext(UserContext) as AppContext;

  return createPortal(
    <div className='menuModal'>
      <div className='menuLayout'>
        <div className='closeModal'>
          <button onClick={closeMenuModal}>X</button>
        </div>
        <h2>{user.name}</h2>
        <div className='codeToFriend'>
          <p>copy and share this code to play with your friend</p>
          <div className='code'>
            <p>{room._id}</p>
            <button onClick={copyCode}>copy</button>
          </div>
        </div>
        <div className='scoreGame'>
          <h2>SCORES</h2>
          <div className='scoreGrid'>
            <div className='player'>
              <p className='name'>{user.name}</p>
              <div className='player__score'>
                <span>score</span>
                <p>{user.points}</p>
              </div>
            </div>
            {enemy._id && (
              <div className='player'>
                <p className='name'>{enemy.name}</p>
                <div className='player__score'>
                  <span>score</span>
                  <p>{enemy.points}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("menu") as HTMLElement
  );
};
