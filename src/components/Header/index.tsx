import "./Header.css";

export const Header = ({ points }: { points: number }) => {
  return (
    <header className='Header'>
      <div className='Header__title'>
        <p>CUARZO</p>
        <p>PAPIRO</p>
        <p>NAVAJA</p>
      </div>
      <div className='Header__score'>
        <span>score</span>
        <p>{points}</p>
      </div>
    </header>
  );
};
