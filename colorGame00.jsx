// notice properties takeTurn and id are being passed in
const Square = ({ takeTurn, id }) => {
  const palet = ["blue", "red", "green"];
  // id is the square's number
  // We call takeTurn to tell Parent we have clicked in this square

  const [color, setColor] = React.useState(2);

  return (
    <button
      onClick={(e) => {
        setColor(takeTurn(id));
        e.preventDefault();
        e.target.style.background = palet[color];
      }}
    ></button>
  );
};

const Board = () => {
  // 1st player is 1
  // State keeps track of next player
  const [player, setPlayer] = React.useState(1);
  const [mounted, setMounted] = React.useState(true);

  // check for winner (see superset.js)
  let status = `Player ${player}`;
  const toggle =()=> setMounted(!mounted);
  console.log(`Status Player ${status}`);

  // Note that Child (Square Component) calls this function
  // However the function has access to the player held here
  const takeTurn = (id) => {
    setPlayer((player + 1) % 2); // get next player
    return player;
  };
  function renderSquare(i, color) {
    // use properties to pass callback function takeTurn to Child
    return <Square takeTurn={takeTurn} id={i}></Square>;
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {mounted && renderSquare(0)}
        {mounted && renderSquare(1)}
        {mounted && renderSquare(2)}
      </div>
      <div id="info">
        <button onClick={toggle}>Show/Hide Row</button>
        <h1> Turn of Player {player} </h1>
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
