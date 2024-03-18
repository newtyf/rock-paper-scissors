import { UseHome } from "../hooks/UseHome";

export const Home = () => {
  const { handleFormUser, handleFormRoom, playWithPc, createRoom, joinRoom } = UseHome();

  return (
    <div className='Home'>
      <div className="social-links">
        <p><a href="https://github.com/newtyf/rock-paper-scissors" target="_blank" rel="noopener noreferrer">Github</a></p>
        <span> - </span>
        <p>Hecho por <a href="https://newtyf.com/" target="_blank" rel="noopener noreferrer">Newtyf</a></p>
      </div>
      <h1>ROCK - PAPER - SCISSORS</h1>
      <picture style={{ margin: "20px 0" }}>
        <img src='/home/rps-unscreen.gif' width={300} alt='rps-gif' />
      </picture>
      <form>
        <input
          type='text'
          onChange={handleFormUser}
          placeholder='Ingrese su nick'
        />
        <button
          onClick={playWithPc}
          className='btn-black'
          style={{ width: "300px" }}
          type='submit'
        >
          PLAY VS PC
        </button>
        <p className='separator'>or play with your friend</p>
        <input
          type='text'
          onChange={handleFormRoom}
          placeholder='Ingrese el id de la sala'
        />
        <button
          onClick={createRoom}
          className='btn-black'
          style={{ width: "140px", marginRight: "15px" }}
          type='submit'
        >
          CREATE ROOM
        </button>
        <button
          onClick={joinRoom}
          className='btn-black'
          style={{ width: "140px", marginLeft: "5px" }}
          type='submit'
        >
          JOIN ROOM
        </button>
      </form>
      <div className="social-links">
        <p>Créditp al diseño a <a href="https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH" target="_blank" rel="noopener noreferrer">Frontend Mentor</a></p>
      </div>
    </div>
  );
};
