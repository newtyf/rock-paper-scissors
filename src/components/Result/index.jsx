import "./Result.css";

function Result({ result, onClick }) {
  return (
    <div className="Result">
      <p>{result}</p>
      <button onClick={onClick}>PLAY AGAIN</button>
    </div>
  );
}

export { Result };
