import { useEffect, useState } from "react";
import "./styles.css";

const NUM_SQUARES = 7;

export default function App() {
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [areAllSelected, setAreAllSelected] = useState(false);
  const squares = [];
  for (let i = 0; i < NUM_SQUARES; i++) {
    squares.push(i);
  }

  const handleClick = (e) => {
    // setSelectedSquares((prev) => ({
    //   ...prev,
    //   [e.target.id]: Object.keys(prev).length
    // }));
    if (!selectedSquares.includes(e.target.id)) {
      let newSelected = [...selectedSquares, e.target.id];
      setSelectedSquares(newSelected);
      if (newSelected.length === squares.length) {
        setAreAllSelected(true);
      }
    }
  };

  const display = squares.map((square, i) => {
    return (
      <div
        onClick={(e) => handleClick(e)}
        key={i}
        id={`div${i}`}
        className={`div${i} ${
          selectedSquares.includes(`div${i}`) && "clicked"
        }`}
      ></div>
    );
  });

  useEffect(() => {
    if (areAllSelected && selectedSquares.length !== 0) {
      setTimeout(() => {
        let newSelected = [...selectedSquares];
        newSelected.shift();
        setSelectedSquares(newSelected);
      }, 1000);
    } else {
      setAreAllSelected(false);
    }
  }, [areAllSelected, selectedSquares, squares.length]);

  return (
    <div className="App">
      <h1>Click Boxes</h1>
      <p>
        Remembering order, click each box once to add a background color. After
        all the boxes have been clicked, the background of each box will be
        cleared in the reverse order that they were clicked.
      </p>
      <div className="parent">{display}</div>
    </div>
  );
}
